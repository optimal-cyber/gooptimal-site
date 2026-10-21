# 9line: FedRAMP 20x vulnerability rules (VDR and VER), Class C

36 rules apply: 0 implemented, 0 partially implemented, 36 not implemented. Required for new 20x applications from 2026-12-07 (grace to 2027-03-07). FedRAMP Consolidated Rules 2026.10.13.01.

## VDR: Vulnerability Detection and Response

| Rule | Name | Force at Class C | Status |
|---|---|---|---|
| VDR-CSO-ADT | Automate Detection | SHOULD | Not Implemented |
| VDR-CSO-AKE | Avoid KEVs | SHOULD NOT | Not Implemented |
| VDR-CSO-DAC | Detect After Changes | SHOULD | Not Implemented |
| VDR-CSO-DET | Vulnerability Detection | MUST | Not Implemented |
| VDR-CSO-DFR | Design For Resilience | SHOULD | Not Implemented |
| VDR-CSO-FAV | Failures Are Vulnerabilities | MUST | Not Implemented |
| VDR-CSO-MSP | Maintain Security | SHOULD NOT | Not Implemented |
| VDR-CSO-RES | Vulnerability Response | MUST | Not Implemented |
| VDR-CSO-SIR | Sampling | MAY | Not Implemented |
| VDR-TFR-KEV | Remediate KEVs | SHOULD | Not Implemented |
| VDR-TFR-MVX | Persistent Machine Verification and Validation for 20x | MUST (3 days) | Not Implemented |
| VDR-TFR-NMV | Non-Machine Verification and Validation | MUST | Not Implemented |
| VDR-TFR-PCD | Persistently Complete Detection | SHOULD (1 months) | Not Implemented |
| VDR-TFR-PDD | Persistent Drift Detection | SHOULD (14 days) | Not Implemented |
| VDR-TFR-PSD | Persistent Sample Detection | SHOULD (3 days) | Not Implemented |
| VDR-TFR-PVR | Mitigation and Remediation Expectations | SHOULD | Not Implemented |
| VDR-TFR-RMN | Remaining Vulnerabilities | SHOULD | Not Implemented |

**VDR-CSO-ADT: Automate Detection.** Providers SHOULD use automated services to improve and streamline vulnerability detection and response.

**VDR-CSO-AKE: Avoid KEVs.** Providers SHOULD NOT deploy or otherwise activate new machine-based information resources with Known Exploited Vulnerabilities.

**VDR-CSO-DAC: Detect After Changes.** Providers SHOULD automatically perform vulnerability detection on representative samples of new or significantly changed information resources.

**VDR-CSO-DET: Vulnerability Detection.** Providers MUST systematically, persistently, and promptly discover and identify vulnerabilities within their cloud service offering using appropriate techniques such as assessment, scanning, threat intelligence, vulnerability disclosure mechanisms, bug bounties, penetration testing, incident response, automated control testing, supply chain monitoring, and other relevant capabilities; this process is called vulnerability detection. Vulnerability detection includes persistently verifying and validating that information resources and processes are operating as intended and documented for FedRAMP Practices.

**VDR-CSO-DFR: Design For Resilience.** Providers SHOULD make design and architecture decisions for their cloud service offering that mitigate the risk of vulnerabilities by default AND decrease the risk and complexity of vulnerability detection and response.

**VDR-CSO-FAV: Failures Are Vulnerabilities.** Providers MUST treat problems or failures with their vulnerability detection and response processes as vulnerabilities.

**VDR-CSO-MSP: Maintain Security.** Providers SHOULD NOT weaken the security of information resources to facilitate vulnerability scanning, detection, or assessment activities.

**VDR-CSO-RES: Vulnerability Response.** Providers MUST systematically, persistently, and promptly track, evaluate, monitor, mitigate, remediate, assess exploitation of, report, and otherwise manage all detected vulnerabilities within their cloud service offering; this process is called vulnerability response.

**VDR-CSO-SIR: Sampling.** Providers MAY sample effectively identical information resources, especially machine-based information resources, when performing vulnerability detection UNLESS doing so would decrease the efficiency or effectiveness of vulnerability detection.

**VDR-TFR-KEV: Remediate KEVs.** Providers SHOULD remediate Known Exploited Vulnerabilities according to the due dates in the CISA Known Exploited Vulnerabilities Catalog (even if the vulnerability has been fully mitigated) as required by CISA Binding Operational Directive (BOD) 26-04 or any successor guidance from CISA.

**VDR-TFR-MVX: Persistent Machine Verification and Validation for 20x.** Providers of FedRAMP 20x Class C offerings MUST verify and validate the status of machine-based information resources at least once every 3 days.

**VDR-TFR-NMV: Non-Machine Verification and Validation.** Providers MUST verify and validate the status of non-machine-based information resources at least once every 3 months.

**VDR-TFR-PCD: Persistently Complete Detection.** Providers with Class C Certifications SHOULD persistently perform vulnerability detection on all information resources that are NOT likely to drift, at least once every month.

**VDR-TFR-PDD: Persistent Drift Detection.** Providers with Class C Certifications SHOULD persistently perform vulnerability detection on all information resources that are likely to drift, at least once every 14 days.

**VDR-TFR-PSD: Persistent Sample Detection.** Providers with Class C Certifications SHOULD persistently perform vulnerability detection on representative samples of similar machine-based information resources, at least once every 3 days.

**VDR-TFR-PVR: Mitigation and Remediation Expectations.** Providers with Class C Certifications SHOULD partially mitigate vulnerabilities, fully mitigate vulnerabilities, or remediate vulnerabilities to a lower Potential Agency Impact N-rating within the timeframes from evaluation shown below, factoring for the current Potential Agency Impact N-rating as defined in VER-EVA-EPA (Estimate Potential Agency Impact), internet reachability, and likely exploitability:

**VDR-TFR-RMN: Remaining Vulnerabilities.** Providers SHOULD mitigate or remediate remaining vulnerabilities during routine operations as determined necessary by the provider.

## VER: Vulnerability Evaluation and Reporting

| Rule | Name | Force at Class C | Status |
|---|---|---|---|
| VER-EVA-AIA | Assume It's Automatable | MUST | Not Implemented |
| VER-EVA-EFA | Evaluation Factors | SHOULD | Not Implemented |
| VER-EVA-EFP | Evaluate False Positives | SHOULD | Not Implemented |
| VER-EVA-EIR | Evaluate Internet-Reachability | MUST | Not Implemented |
| VER-EVA-ELX | Evaluate Exploitability | MUST | Not Implemented |
| VER-EVA-EPA | Estimate Potential Agency Impact | MUST | Not Implemented |
| VER-EVA-GRV | Group Vulnerabilities | SHOULD | Not Implemented |
| VER-RPT-AVI | Accepted Vulnerability Info | MUST | Not Implemented |
| VER-RPT-HLO | High-Level Overviews | SHOULD | Not Implemented |
| VER-RPT-NID | Responsible Disclosure | MUST NOT | Not Implemented |
| VER-RPT-PER | Persistent Reporting | MUST | Not Implemented |
| VER-RPT-RPD | Responsible Public Disclosure | MAY | Not Implemented |
| VER-RPT-VDT | Vulnerability Details | MUST | Not Implemented |
| VER-TFR-EVU | Evaluate Vulnerabilities Quickly | SHOULD (5 days) | Not Implemented |
| VER-TFR-IRI | Internet-Reachable Incidents | SHOULD | Not Implemented |
| VER-TFR-MAV | Mark Accepted Vulnerabilities | MUST | Not Implemented |
| VER-TFR-MHR | Monthly Activity Report | MUST | Not Implemented |
| VER-TFR-MRH | Historical Activity | SHOULD (14 days) | Not Implemented |
| VER-TFR-NRI | Non-Internet-Reachable Incidents | MAY | Not Implemented |

**VER-EVA-AIA: Assume It's Automatable.** Providers MUST assume the exploitation of vulnerabilities can be automated UNLESS they have evidence proving otherwise.

**VER-EVA-EFA: Evaluation Factors.** Providers SHOULD consider at least the following factors when considering the context of the cloud service offering to evaluate detected vulnerabilities:
- Criticality: How important are the systems or information that might be impacted by the vulnerability?
- Reachability: How might a threat actor reach the vulnerability and how likely is that?
- Exploitability: How easy is it for a threat actor to exploit the vulnerability and how likely is that?
- Detectability: How easy is it for a threat actor to become aware of the vulnerability and how likely is that?
- Prevalence: How much of the cloud service offering is affected by the vulnerability?
- Privilege: How much privileged authority or access is granted or can be gained from exploiting the vulnerability?
- Proximate Vulnerabilities: How does this vulnerability interact with previously detected vulnerabilities, especially partially or fully mitigated vulnerabilities?
- Known Threats: How might already known threats leverage the vulnerability and how likely is that?

**VER-EVA-EFP: Evaluate False Positives.** Providers SHOULD evaluate detected vulnerabilities, considering the context of the cloud service offering, to determine if they are false positive vulnerabilities.

**VER-EVA-EIR: Evaluate Internet-Reachability.** Providers MUST evaluate detected vulnerabilities, considering the context of the cloud service offering, to determine if they are internet-reachable vulnerabilities.

**VER-EVA-ELX: Evaluate Exploitability.** Providers MUST evaluate detected vulnerabilities, considering the context of the cloud service offering, to determine if they are likely exploitable vulnerabilities.

**VER-EVA-EPA: Estimate Potential Agency Impact.** Providers MUST evaluate detected vulnerabilities, considering the context of the cloud service offering, to estimate the likely potential agency impact of exploitation on government customers AND assign one of the following Potential Agency Impact N-ratings (PAIN):

**VER-EVA-GRV: Group Vulnerabilities.** Providers SHOULD evaluate detected vulnerabilities, considering the context of the cloud service offering, to identify logical groupings of affected information resources that may improve the efficiency and effectiveness of vulnerability response by consolidating further activity; FedRAMP Vulnerability Detection and Response rules are then applied to these consolidated groupings of vulnerabilities instead of each individual detected instance.

**VER-RPT-AVI: Accepted Vulnerability Info.** Providers MUST include the following information on accepted vulnerabilities when reporting on vulnerability detection and response activity:
- Provider's internally assigned tracking identifier
- Time and source of the detection
- Time of completed evaluation
- Is it an internet-reachable vulnerability or not?
- Is it a likely exploitable vulnerability or not?
- Currently estimated Potential Agency Impact N-rating
- Explanation of why this is an accepted vulnerability
- Any supplementary information the provider determines will responsibly help federal agencies assess or mitigate the risk to their federal customer data within the cloud service offering resulting from the accepted vulnerability

**VER-RPT-HLO: High-Level Overviews.** Providers SHOULD include high-level overviews of ALL vulnerability detection and response activities conducted during this period for the cloud service offering; this includes vulnerability disclosure programs, bug bounty programs, penetration testing, assessments, etc.

**VER-RPT-NID: Responsible Disclosure.** Providers MUST NOT irresponsibly disclose specific sensitive information about vulnerabilities that would likely lead to exploitation, but MUST disclose sufficient information for informed risk-based decision-making to all necessary parties.

**VER-RPT-PER: Persistent Reporting.** Providers MUST report vulnerability detection and response activity (including persistent verification and validation) to all necessary parties persistently, summarizing ALL activity since the previous report; these reports are FedRAMP Certification Data and are subject to FedRAMP Certification Data Sharing rules.

**VER-RPT-RPD: Responsible Public Disclosure.** Providers MAY responsibly disclose vulnerabilities publicly or with other parties if the provider determines doing so will NOT likely lead to exploitation.

**VER-RPT-VDT: Vulnerability Details.** Providers MUST include the following information (if applicable) on detected vulnerabilities when reporting on vulnerability detection and response activity, UNLESS it is an accepted vulnerability:
- Provider's internally assigned tracking identifier
- Time and source of the detection
- Time of completed evaluation
- Is it an internet-reachable vulnerability or not?
- Is it a likely exploitable vulnerability or not?
- Historically and currently estimated Potential Agency Impact N-rating of exploitation
- Time and Potential Agency Impact N-rating of each completed and evaluated reduction in Potential Agency Impact N-rating
- Estimated time and target Potential Agency Impact N-rating of next reduction in Potential Agency Impact N-rating
- Is it currently or is it likely to become an overdue vulnerability or not? If so, explain.
- Any supplementary information the provider responsibly determines will help federal agencies assess or mitigate the risk to their federal customer data within the cloud service offering resulting from the vulnerability
- Final disposition of the vulnerability

**VER-TFR-EVU: Evaluate Vulnerabilities Quickly.** Providers with Class C Certifications SHOULD evaluate ALL vulnerabilities as required by VER-EVA (Evaluation) within 5 days of detection.

**VER-TFR-IRI: Internet-Reachable Incidents.** Providers with Class C Certifications SHOULD treat internet-reachable likely exploitable vulnerabilities where Potential Agency Impact N-rating > 3 as a FedRAMP Reportable Incident until they are partially mitigated vulnerabilities at N3 or below.

**VER-TFR-MAV: Mark Accepted Vulnerabilities.** Providers MUST categorize any vulnerability that is not or will not be fully mitigated or remediated within 192 days of evaluation as an accepted vulnerability.

**VER-TFR-MHR: Monthly Activity Report.** Providers MUST report vulnerability detection and response activity to all necessary parties in a consistent format that is human readable at least monthly.

**VER-TFR-MRH: Historical Activity.** Providers with Class C Certifications SHOULD make all recent historical vulnerability detection and response activity available in JSON format for automated retrieval by all necessary parties (e.g. using an API service or similar); this information SHOULD be updated persistently, at least once every 14 days.

**VER-TFR-NRI: Non-Internet-Reachable Incidents.** Providers with Class C Certifications MAY treat likely exploitable vulnerabilities that are NOT internet-reachable where Potential Agency Impact N-rating = 5 as a FedRAMP Reportable Incident until they are partially mitigated vulnerabilities at N4 or below.

Generated 2026-10-19T16:30:29+00:00. Machine-readable: vdr-ver-status.json.
