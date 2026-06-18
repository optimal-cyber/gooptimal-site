---
title: "Securing AI Models in the Defense Sector: Threats and Mitigations"
image: "/blog/ai-security.jpg"
imageAlt: "Securing AI models in the defense sector"
description: "As DoD adoption of AI accelerates, so do adversarial threats. Learn about the top attack vectors targeting military AI systems and how to defend against them using MITRE ATLAS and NIST AI RMF."
date: 2026-01-15
category: "Industry Insights"
tags:
  - "AI security"
  - "defense"
  - "DoD"
  - "adversarial AI"
  - "LLM"
---

The Department of Defense is in the midst of a historic transformation. From autonomous surveillance drones to predictive logistics systems, from intelligence analysis pipelines to real-time battlefield decision support, artificial intelligence is becoming deeply embedded in nearly every facet of modern military operations. The 2024 DoD Data, Analytics, and AI Adoption Strategy set ambitious goals for scaling AI across the enterprise, and agencies like the Chief Digital and Artificial Intelligence Office (CDAO) are driving adoption at unprecedented speed.

But this rapid adoption introduces a new class of risk. AI systems are not traditional software. They are probabilistic, data-dependent, and often opaque in their decision-making. The attack surface they present is fundamentally different from conventional applications, and adversaries, both nation-state and non-state, are already developing capabilities to exploit these weaknesses. For defense organizations deploying AI at scale, understanding and mitigating these threats is not optional. It is a matter of national security.

## The Expanding AI Attack Surface

Traditional software security focuses on well-understood categories: input validation, authentication, authorization, memory safety, and network security. AI systems inherit all of these concerns, but they also introduce entirely new dimensions of vulnerability that most security programs are not equipped to address.

Military AI systems differ from their commercial counterparts in several critical ways. First, the **consequence of failure is catastrophic**. A compromised image classification model in a consumer app might misidentify a dog breed. A compromised target recognition model in a weapons system could lead to civilian casualties or missed threats. Second, **adversaries are sophisticated and motivated**. Nation-state threat actors have dedicated research programs focused on adversarial machine learning, and they are actively probing for weaknesses in deployed systems. Third, **operational environments are contested**. Models deployed at the tactical edge operate in degraded, denied, and disconnected environments where traditional monitoring and update mechanisms may not function.

The attack surface spans the entire AI lifecycle: from the training data and model development environment, through the deployment pipeline, to the inference endpoint where the model processes real-world inputs. Each stage presents distinct threat vectors that require specialized security controls.

## Top Threat Vectors

Understanding the specific ways adversaries can compromise AI systems is essential for building effective defenses. The following threat vectors represent the most significant risks facing defense AI deployments today.

### Adversarial Examples and Evasion Attacks

Adversarial examples are carefully crafted inputs designed to cause a model to produce incorrect outputs while appearing normal to human observers. In the defense context, this could mean applying specific patterns to a vehicle to cause an object detection model to misclassify it, or subtly modifying signals to evade electronic warfare detection systems.

These attacks are particularly dangerous because they can be **physically realizable**. Researchers have demonstrated adversarial patches that, when printed and applied to real-world objects, consistently fool state-of-the-art classifiers. For a military adversary, the ability to render assets invisible to AI-powered surveillance or cause misidentification represents an enormous tactical advantage. Evasion attacks can be mounted without any access to the target model itself using transferability, where adversarial examples crafted against one model frequently fool others trained on similar data.

### Data Poisoning and Training Data Manipulation

Data poisoning attacks target the model during training by injecting malicious samples into the training dataset. The goal is to embed hidden behaviors, known as backdoors, that an adversary can trigger at will during deployment. For example, a poisoned object detection model might function normally under most conditions but consistently fail to detect a specific type of vehicle when a particular trigger pattern is present.

In the defense sector, training data often comes from multiple sources, including allied nations, commercial vendors, and open-source repositories. Each of these represents a potential vector for poisoning. The challenge is compounded by the fact that **poisoning attacks can be extremely subtle**, affecting less than one percent of training samples while still embedding reliable backdoor behavior. Standard data validation processes are typically insufficient to detect these manipulations.

### Model Extraction and Intellectual Property Theft

Model extraction attacks allow an adversary to create a functional copy of a target model by repeatedly querying it and observing its outputs. In the defense context, this means that an adversary who gains even limited access to a model's inference API, through a compromised endpoint, a captured edge device, or a supply chain interception, can potentially reconstruct enough of the model's behavior to develop effective countermeasures.

Extracted models can serve multiple adversary objectives: they can be used to develop targeted adversarial examples, to understand the capabilities and limitations of the system, or to replicate classified capabilities for use by the adversary's own forces. The sensitivity of defense AI models makes this threat vector particularly consequential, as many of these models are derived from classified training data or represent significant investment in research and development.

### Prompt Injection Attacks on LLM-Integrated Systems

As defense organizations increasingly integrate large language models (LLMs) into intelligence analysis, operational planning, and decision support workflows, prompt injection has emerged as a critical threat vector. In a prompt injection attack, an adversary embeds malicious instructions within data that the LLM processes, causing it to deviate from its intended behavior.

Consider an intelligence analysis system that uses an LLM to summarize intercepted communications. An adversary aware of this capability could craft communications that contain hidden instructions designed to manipulate the summary, suppress critical information, or inject false intelligence. **Indirect prompt injection**, where the attack payload is embedded in external data sources rather than direct user input, is especially dangerous in defense contexts because analysts may trust the LLM's output without reviewing the raw source material.

### Supply Chain Attacks on ML Frameworks and Models

The AI supply chain is vast and complex, encompassing open-source frameworks like PyTorch and TensorFlow, pre-trained foundation models, third-party datasets, and specialized hardware such as GPUs and TPUs. Each component represents a potential attack vector. Compromised ML frameworks can introduce vulnerabilities into every model trained with them. Trojaned pre-trained models, downloaded from public repositories like Hugging Face, can carry embedded backdoors that persist through fine-tuning.

The defense sector's increasing reliance on commercial AI technologies and open-source components makes supply chain security a first-order concern. Unlike traditional software supply chain attacks, which typically introduce known vulnerability patterns, **ML supply chain attacks can be functionally invisible** because the malicious behavior is encoded in model weights rather than in code that can be statically analyzed.

## MITRE ATLAS and the AI Threat Framework

Recognizing the need for a structured approach to AI threats, MITRE developed [ATLAS (Adversarial Threat Landscape for AI Systems)](https://atlas.mitre.org/), a knowledge base of adversarial tactics and techniques targeting AI systems. Modeled after the widely adopted MITRE ATT&CK framework for traditional cyber threats, ATLAS provides a common language and taxonomy for describing AI-specific attacks.

ATLAS catalogs techniques across the full adversarial lifecycle, from reconnaissance against ML systems through initial access to the model or data, persistence through backdoors, and impact through evasion or data manipulation. For defense organizations, ATLAS serves several critical functions:

- **Threat modeling:** Security teams can use ATLAS to systematically identify which techniques are most relevant to their specific AI deployments and prioritize defenses accordingly.
- **Red teaming:** Offensive security teams can use ATLAS as a playbook for structured adversarial testing of AI systems, ensuring comprehensive coverage of known attack techniques.
- **Detection engineering:** The framework's detailed technique descriptions enable the development of detection rules and monitoring capabilities tailored to AI-specific threats.
- **Communication:** ATLAS provides a shared vocabulary for communicating about AI threats across technical and non-technical stakeholders, from ML engineers to program managers to mission commanders.

Organizations deploying AI in defense environments should treat ATLAS as a foundational reference, integrating its taxonomy into their threat modeling processes and red team methodologies.

## Building a Defense-Grade AI Security Program

Protecting AI systems in defense environments requires a comprehensive, lifecycle-oriented approach that addresses threats at every stage, from development through deployment and ongoing operations. The following pillars form the foundation of a robust AI security program.

### Red Teaming AI Systems Continuously

Traditional penetration testing is necessary but not sufficient for AI systems. Defense organizations need dedicated AI red teams equipped with expertise in adversarial machine learning, prompt engineering, and model exploitation. These teams should conduct structured assessments using the MITRE ATLAS framework, testing each deployed model against relevant adversarial techniques.

Red teaming should be continuous, not a one-time event. AI models are dynamic: their behavior can shift as they encounter new data distributions, and new attack techniques emerge regularly. Automated adversarial testing pipelines should be integrated into the CI/CD process, running robustness evaluations against known attack vectors with every model update. Manual red team exercises should be conducted at regular intervals to test for novel threats and to evaluate the effectiveness of defenses in realistic operational scenarios.

### Implementing Model Monitoring and Drift Detection

Once deployed, AI models must be continuously monitored for signs of adversarial activity or unexpected behavioral changes. Key monitoring capabilities include:

- **Input anomaly detection:** Identifying inputs that fall outside the expected distribution, which may indicate adversarial probing or evasion attempts.
- **Output distribution monitoring:** Tracking the distribution of model outputs over time to detect shifts that could indicate poisoning, drift, or adversarial manipulation.
- **Confidence calibration:** Monitoring model confidence scores for anomalies that may signal adversarial inputs, which often produce unusual confidence patterns.
- **Query pattern analysis:** Detecting patterns of queries that are consistent with model extraction or systematic probing attacks.

Drift detection is particularly important in defense environments where the operational data distribution may differ significantly from training data. Models deployed in new geographic regions, against new adversaries, or in evolving tactical situations may experience legitimate distribution shift that degrades performance. Distinguishing between natural drift and adversarial manipulation requires sophisticated monitoring and expert analysis.

### Securing the ML Pipeline End-to-End

The machine learning pipeline, from data ingestion through model training, validation, and deployment, must be treated as critical infrastructure with security controls at every stage. This includes cryptographic verification of training data provenance, integrity checks on model artifacts, access controls on training infrastructure, and secure model serving configurations.

Particular attention should be given to the **model registry and artifact store**, which serve as the central point of trust for deployed models. These systems must implement strong access controls, maintain comprehensive audit logs, and support cryptographic signing of model artifacts to ensure that only validated, authorized models are deployed to operational environments. Container images used for model serving should undergo the same rigorous scanning and hardening applied to any other defense workload.

### Compliance with NIST AI RMF

The [NIST AI Risk Management Framework (AI RMF)](https://www.nist.gov/artificial-intelligence/risk-management-framework) provides a structured approach to identifying, assessing, and mitigating risks associated with AI systems. For defense organizations, alignment with AI RMF is increasingly becoming a requirement for AI deployments, and it provides a valuable complement to existing cybersecurity frameworks like NIST 800-53 and the Risk Management Framework (RMF).

The AI RMF's four core functions, Govern, Map, Measure, and Manage, map directly to the needs of defense AI programs. The Govern function establishes accountability structures for AI risk. The Map function identifies and documents the context, capabilities, and limitations of AI systems. The Measure function provides methodologies for evaluating AI risks, including adversarial robustness. The Manage function addresses the ongoing treatment and monitoring of identified risks.

Organizations should integrate AI RMF requirements into their existing ATO processes, ensuring that AI-specific risks are documented and addressed alongside traditional cybersecurity controls. This integration is critical because AI systems frequently operate within broader software architectures that must also comply with FedRAMP, CMMC, or other defense accreditation frameworks.

> The security of AI systems cannot be treated as an afterthought or a separate workstream. It must be woven into the fabric of every phase of the AI lifecycle, from data collection through model retirement. Organizations that treat AI security as a bolt-on will find themselves perpetually reacting to threats rather than proactively managing risk.

## Conclusion

The defense sector's adoption of AI is accelerating, and with good reason. These technologies offer transformative capabilities for intelligence, operations, and logistics. But the unique characteristics of AI systems, their data dependency, probabilistic nature, and novel attack surface, demand a fundamentally different approach to security.

Defense organizations must move beyond traditional cybersecurity paradigms and develop specialized capabilities for AI security. This means investing in adversarial ML expertise, adopting frameworks like MITRE ATLAS and NIST AI RMF, implementing continuous monitoring and red teaming, and securing the ML pipeline with the same rigor applied to any other mission-critical infrastructure.

The adversaries are already investing heavily in capabilities to exploit AI vulnerabilities. The question is not whether defense AI systems will be targeted, but whether organizations will be prepared when they are. Building that preparedness starts now, with a clear-eyed understanding of the threat landscape and a commitment to defense-grade AI security practices.
