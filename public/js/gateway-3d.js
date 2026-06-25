/* =============================================================================
 * Optimal — Secure Gateway Constellation (WebGL)
 * -----------------------------------------------------------------------------
 * A self-contained, dependency-light 3D scene that visualizes the product:
 *   - a glowing Gateway core (the single secure door)
 *   - a zero-trust shield boundary around it
 *   - frontier-model / multi-cloud nodes orbiting the core
 *   - live request -> authorize -> route particles flowing inward,
 *     and authorized-response particles flowing back out
 *
 * Drop a <canvas data-gateway-3d ...> into any hero. This script:
 *   - lazy-loads three.js from a CDN only when such a canvas exists
 *   - degrades gracefully (no WebGL / no three.js -> the SVG watermark stays)
 *   - honors prefers-reduced-motion (renders a single static frame)
 *   - caps device pixel ratio and pauses when the canvas is off-screen / hidden
 *
 * Per-canvas config via data attributes:
 *   data-variant="hero" | "ambient"   focal (default) vs. dim background
 *   data-density="1.0"                 particle/node density multiplier
 * ========================================================================== */
(function () {
  'use strict';

  var SELECTOR = '[data-gateway-3d]';
  var THREE_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

  // Brand palette (hex ints for three.js) — mirrors src/styles/global.css.
  // `dusk` is mapped to the theme's cool "steel" accent (no purple in this theme).
  var C = {
    sunset: 0xff8a3d, sunsetLight: 0xffb066, coral: 0xff5c72, ember: 0xff6a3d,
    berry: 0xd6557a, dusk: 0x5aa9c9, seafoam: 0x46b98a, sand: 0xeef1f7
  };

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function supportsWebGL() {
    try {
      var c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (e) { return false; }
  }

  function loadThree() {
    return new Promise(function (resolve, reject) {
      if (window.THREE) return resolve(window.THREE);
      var s = document.createElement('script');
      s.src = THREE_SRC;
      s.async = true;
      s.onload = function () { window.THREE ? resolve(window.THREE) : reject(new Error('THREE missing')); };
      s.onerror = function () { reject(new Error('three.js failed to load')); };
      document.head.appendChild(s);
    });
  }

  var prefersReducedMotion = (function () {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    catch (e) { return false; }
  })();

  // Soft circular sprite used for every glowing point.
  function makeGlowTexture(THREE) {
    var size = 64;
    var cv = document.createElement('canvas');
    cv.width = cv.height = size;
    var ctx = cv.getContext('2d');
    var g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0.0, 'rgba(255,255,255,1)');
    g.addColorStop(0.25, 'rgba(255,255,255,0.7)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.18)');
    g.addColorStop(1.0, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    var tex = new THREE.CanvasTexture(cv);
    tex.needsUpdate = true;
    return tex;
  }

  // Evenly distribute n points on a unit sphere (fibonacci spiral).
  function fibSphere(i, n) {
    var off = 2 / n;
    var inc = Math.PI * (3 - Math.sqrt(5));
    var y = i * off - 1 + off / 2;
    var r = Math.sqrt(Math.max(0, 1 - y * y));
    var phi = i * inc;
    return [Math.cos(phi) * r, y, Math.sin(phi) * r];
  }

  function initScene(THREE, canvas) {
    var variant = canvas.getAttribute('data-variant') || 'hero';
    var ambient = variant === 'ambient';
    var centerAlign = canvas.getAttribute('data-align') === 'center';
    var density = parseFloat(canvas.getAttribute('data-density')) || 1;

    var renderer = new THREE.WebGLRenderer({
      canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance'
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 9.2);

    var root = new THREE.Group();      // holds everything, follows pointer
    var spin = new THREE.Group();      // auto-rotating constellation
    root.add(spin);
    scene.add(root);

    var glowTex = makeGlowTexture(THREE);
    var baseOpacity = ambient ? 0.5 : 1;

    // --- Gateway core: wireframe icosahedron + soft additive halo -----------
    var coreWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.12, 1),
      new THREE.MeshBasicMaterial({ color: C.sunset, wireframe: true, transparent: true, opacity: 0.9 * baseOpacity })
    );
    spin.add(coreWire);

    var coreInner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.74, 1),
      new THREE.MeshBasicMaterial({ color: C.coral, transparent: true, opacity: 0.16 * baseOpacity, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    spin.add(coreInner);

    var halo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, color: C.sunset, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.85 * baseOpacity
    }));
    halo.scale.set(6.2, 6.2, 1);
    spin.add(halo);

    // --- Zero-trust shield: outer wireframe boundary ------------------------
    var shield = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.75, 1),
      new THREE.MeshBasicMaterial({ color: C.dusk, wireframe: true, transparent: true, opacity: 0.13 * baseOpacity })
    );
    spin.add(shield);

    var shield2 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.78, 1),
      new THREE.MeshBasicMaterial({ color: C.seafoam, wireframe: true, transparent: true, opacity: 0.05 * baseOpacity })
    );
    spin.add(shield2);

    // --- Frontier-model / multi-cloud nodes on an orbit ---------------------
    var nodeCount = Math.max(6, Math.round((ambient ? 7 : 10) * density));
    var nodeRadius = 2.35;
    var nodeColors = [C.sunset, C.coral, C.dusk, C.seafoam, C.berry, C.sunsetLight];
    var nodes = [];
    for (var i = 0; i < nodeCount; i++) {
      var p = fibSphere(i, nodeCount);
      var pos = new THREE.Vector3(p[0], p[1], p[2]).multiplyScalar(nodeRadius);
      var col = nodeColors[i % nodeColors.length];
      var node = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTex, color: col, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.95 * baseOpacity
      }));
      node.position.copy(pos);
      node.scale.set(0.62, 0.62, 1);
      spin.add(node);
      nodes.push({ pos: pos, color: new THREE.Color(col) });
    }

    // --- Connection lines: each node -> core --------------------------------
    var linePos = new Float32Array(nodeCount * 2 * 3);
    for (var j = 0; j < nodeCount; j++) {
      linePos[j * 6 + 0] = nodes[j].pos.x;
      linePos[j * 6 + 1] = nodes[j].pos.y;
      linePos[j * 6 + 2] = nodes[j].pos.z;
      // inner end stops just outside the core
      var inner = nodes[j].pos.clone().multiplyScalar(0.46);
      linePos[j * 6 + 3] = inner.x;
      linePos[j * 6 + 4] = inner.y;
      linePos[j * 6 + 5] = inner.z;
    }
    var lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    var lineMat = new THREE.LineBasicMaterial({ color: C.sunset, transparent: true, opacity: 0.16 * baseOpacity, blending: THREE.AdditiveBlending });
    var lines = new THREE.LineSegments(lineGeo, lineMat);
    spin.add(lines);

    // --- Request / response particles flowing along the connections ---------
    var perNode = ambient ? 8 : 14;
    var pCount = Math.round(nodeCount * perNode * density);
    var pPos = new Float32Array(pCount * 3);
    var pCol = new Float32Array(pCount * 3);
    var particles = [];
    var seafoamCol = new THREE.Color(C.seafoam);
    for (var k = 0; k < pCount; k++) {
      var ni = k % nodeCount;
      var inbound = (k % 10) < 7; // ~70% requests in, ~30% responses out
      var pcolor = inbound ? nodes[ni].color : seafoamCol;
      pCol[k * 3 + 0] = pcolor.r;
      pCol[k * 3 + 1] = pcolor.g;
      pCol[k * 3 + 2] = pcolor.b;
      particles.push({
        node: ni,
        inbound: inbound,
        t: Math.random(),
        speed: 0.12 + Math.random() * 0.22
      });
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
    var pMat = new THREE.PointsMaterial({
      size: ambient ? 0.16 : 0.2, map: glowTex, vertexColors: true, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true, opacity: baseOpacity
    });
    var points = new THREE.Points(pGeo, pMat);
    spin.add(points);

    var coreEnd = 0.42; // particles converge to here near the core

    function placeParticles() {
      for (var a = 0; a < particles.length; a++) {
        var pt = particles[a];
        var node = nodes[pt.node].pos;
        // ease-in toward the core so traffic appears to accelerate through the gateway
        var tt = pt.inbound ? pt.t : (1 - pt.t);
        var eased = tt * tt * (3 - 2 * tt);
        var f = 1 - eased * (1 - coreEnd);
        pPos[a * 3 + 0] = node.x * f;
        pPos[a * 3 + 1] = node.y * f;
        pPos[a * 3 + 2] = node.z * f;
      }
      pGeo.attributes.position.needsUpdate = true;
    }

    // --- Ambient dust for depth --------------------------------------------
    var dustCount = ambient ? 90 : 140;
    var dPos = new Float32Array(dustCount * 3);
    for (var d = 0; d < dustCount; d++) {
      var rr = 5 + Math.random() * 6;
      var th = Math.random() * Math.PI * 2;
      var ph = Math.acos(2 * Math.random() - 1);
      dPos[d * 3 + 0] = rr * Math.sin(ph) * Math.cos(th);
      dPos[d * 3 + 1] = rr * Math.sin(ph) * Math.sin(th);
      dPos[d * 3 + 2] = rr * Math.cos(ph);
    }
    var dGeo = new THREE.BufferGeometry();
    dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
    var dust = new THREE.Points(dGeo, new THREE.PointsMaterial({
      size: 0.06, map: glowTex, color: C.sand, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.35 * baseOpacity, sizeAttenuation: true
    }));
    spin.add(dust);

    // --- Layout / resize ----------------------------------------------------
    var wide = true;
    function resize() {
      var w = canvas.clientWidth || canvas.offsetWidth || 1;
      var h = canvas.clientHeight || canvas.offsetHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      wide = (w / h) > 1.15;
      var s = Math.min(1.05, Math.max(0.6, w / 1100));
      if (wide && !centerAlign) {
        // Desktop hero: weight the constellation to the right of the copy.
        root.position.set(1.85, 0, 0);
        spin.scale.setScalar(s);
      } else if (centerAlign) {
        // Section backdrop: centered behind the content.
        root.position.set(0, 0, 0);
        spin.scale.setScalar(s);
      } else {
        // Narrow hero: tuck the scene lower so it sits behind the CTAs,
        // not the headline/paragraph, and keep it smaller.
        root.position.set(0, -1.9, 0);
        spin.scale.setScalar(s * 0.78);
      }
    }

    // --- Pointer parallax ---------------------------------------------------
    var targetRX = 0, targetRY = 0;
    function onPointer(e) {
      var nx = (e.clientX / window.innerWidth) * 2 - 1;
      var ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetRY = nx * 0.35;
      targetRX = ny * 0.22;
    }
    if (!prefersReducedMotion) window.addEventListener('pointermove', onPointer, { passive: true });

    // --- Visibility gating --------------------------------------------------
    var onScreen = true, pageVisible = true;
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting;
        if (onScreen && pageVisible) start();
      }, { threshold: 0.01 });
      io.observe(canvas);
    }
    document.addEventListener('visibilitychange', function () {
      pageVisible = !document.hidden;
      if (pageVisible && onScreen) start();
    });

    var ro;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    } else {
      window.addEventListener('resize', resize);
    }

    // --- Animation ----------------------------------------------------------
    var last = 0, rafId = null, running = false;
    function frame(now) {
      if (!running) return;
      if (!onScreen || !pageVisible) { running = false; rafId = null; return; }
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      var t = now / 1000;

      spin.rotation.y += dt * 0.16;
      spin.rotation.x = Math.sin(t * 0.25) * 0.12;
      coreWire.rotation.y -= dt * 0.5;
      coreWire.rotation.x += dt * 0.22;
      shield.rotation.y -= dt * 0.1;
      shield.rotation.z += dt * 0.05;
      shield2.rotation.y += dt * 0.07;
      dust.rotation.y += dt * 0.02;

      // pulsing core + connections
      var pulse = 0.78 + Math.sin(t * 1.6) * 0.22;
      halo.material.opacity = (ambient ? 0.4 : 0.7) * pulse * baseOpacity + 0.12;
      var sc = 6.0 + Math.sin(t * 1.6) * 0.5;
      halo.scale.set(sc, sc, 1);
      lineMat.opacity = (0.1 + 0.08 * (0.5 + 0.5 * Math.sin(t * 2.0))) * baseOpacity;

      // advance traffic
      for (var a = 0; a < particles.length; a++) {
        particles[a].t += particles[a].speed * dt;
        if (particles[a].t >= 1) particles[a].t -= 1;
      }
      placeParticles();

      // ease parallax
      root.rotation.x += (targetRX - root.rotation.x) * 0.05;
      root.rotation.y += (targetRY - root.rotation.y) * 0.05;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      last = 0;
      rafId = requestAnimationFrame(frame);
    }

    // --- Boot ---------------------------------------------------------------
    resize();
    placeParticles();
    if (prefersReducedMotion) {
      // Single static, composed frame — no animation loop.
      spin.rotation.y = 0.5;
      renderer.render(scene, camera);
    } else {
      start();
    }

    // Reveal once we've actually drawn something.
    canvas.style.opacity = '1';
  }

  ready(function () {
    var canvases = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));
    if (!canvases.length) return;
    if (!supportsWebGL()) return; // graceful fallback: the SVG watermark remains

    loadThree().then(function (THREE) {
      canvases.forEach(function (canvas) {
        try { initScene(THREE, canvas); }
        catch (e) { /* leave the static watermark fallback in place */ }
      });
    }).catch(function () { /* CDN blocked / offline — fallback remains */ });
  });
})();
