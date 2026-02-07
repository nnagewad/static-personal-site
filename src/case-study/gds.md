---
order: 2
layout: 'layouts/case-study.njk'
title:
  Government Digital Service
metaDesc: 'update'
image: home
imageAltText:
  3D animated emoji of a friendly and approachable person with a black tuque, glasses, and a beard
subTitle:
  Building simple, trustworthy systems at scale
---
<div class="intro">
  <p>At the Government Digital Service (GDS), I designed products and systems used by millions of people across <a href="https://gov.uk">GOV.UK</a>. Not glamorous work—internal tools, CMS platforms, postcode checkers. The kind of work nobody notices when it's right, and everyone notices when it doesn’t work. That's where I learned what design actually means: building things people can trust, not just things that look pretty. And that integrity has carried into everything I've designed since.</p>

  <p>As a Senior Product Designer, I led work across platforms, design systems, and user-facing services—optimizing for clarity, accessibility, and trust at scale.</p>

  <p>Three projects that demonstrate my range at GDS:</p>
  <ol class="list-extra-space">
    <li><a href="#gov-uk-publishing-design-guide">GOV.UK Publishing Design Guide</a>: I created a design guide for internal publishing tools, adopted across teams within GDS and led to the creation of an org-wide Figma UI Kit</li>
    <li><a href="#upgrading-whitehall-publisher">Upgrading Whitehall Publisher</a>: I modernized a legacy CMS used by content teams across government departments, reducing complexity and establishing reusable patterns</li>
    <li><a href="#covid-19-postcode-checker">COVID-19 Postcode Checker</a>: I designed an emergency service for location-specific restrictions under extreme time pressure; influenced future infrastructure investment</li>
  </ol>
</div>


<section>
  <h2 class="font-size-3">GOV.UK Publishing Design Guide</h2>
  <div class="intro">
    <p>While GOV.UK has a mature <a href="https://design-system.service.gov.uk">Design System</a>, guidance for editorial design and publishing tools was fragmented across documents, wikis, and team-owned resources. This fragmentation slowed teams down, caused inconsistency, and made onboarding new designers unnecessarily difficult.</p>
    <p>I identified the opportunity to consolidate this knowledge into a single source of truth: the <a href="https://design-guide.publishing.service.gov.uk">GOV.UK Publishing Design Guide</a>.</p>
  </div>
  
  <section>
    <h3 class="font-size-2">Design judgment</h3>
    <p>Just myself and a service designer, a tight fiscal quarter, and a fragmented mess of docs and wikis to consolidate. I prioritized adoption over completeness — not about building something impressive, but solving a real frustration: designers spending hours hunting for guidance that should have been easy to find, and as a result slower output.</p>
  </section>
  
  <section>
    <h3 class="font-size-2">Design decisions</h3>
    <ul class="list-extra-space">
      <li><strong>Lean validation first:</strong> Started with a shared Google Doc to consolidate existing knowledge, align contributors, and validate structure before committing to a technical solution</li>
      <li><strong>Design through delivery:</strong> With a single fiscal quarter to ship, I skipped high-fidelity Figma mocks and built directly in 11ty. Every day spent designing in Figma was a day we couldn't spend validating with real users—so I built first and iterated fast.</li>
      <li><strong>Planned for extensibility:</strong> Scoped the initial release tightly while laying foundations for future component references, Figma embeds, and code snippets</li>
      <li><strong>Intentional visual clarity:</strong> Introduced a small set of Lego-inspired illustrations to support conceptual clarity and differentiate the guide without compromising GOV.UK's utilitarian design principles. The illustrations demonstrate the difference between components, patterns, and frontend templates through visual storytelling.</li>
    </ul>
  </section>

  <section>
    <h3 class="font-size-2">Impact</h3>
    <ul class="list-extra-space">
      <li>Adopted across GDS by designers, developers, researchers, product managers, and content designers</li>
      <li>Reduced onboarding time and eliminated duplicated documentation work across teams</li>
      <li>Inspired similar platforms created by other government teams</li>
      <li>Directly influenced the creation of an organization-wide Figma UI Kit used across government</li>
    </ul>
  </section>
</section>


<section>
  <h2 class="font-size-3">Upgrading Whitehall Publisher</h2>
  <div class="intro">
    <p>Whitehall Publisher is the UK government's internal CMS, used across departments to publish guidance, news, and policy content to GOV.UK. The legacy system relied on outdated components and inconsistent workflows, increasing cognitive load, slowing delivery, and introducing avoidable errors.</p>
    <p>I led the UX and design effort to upgrade Whitehall Publisher to the GOV.UK Design System while preserving content designers' existing mental models.</p>
  </div>
  
  <section>
    <h3 class="font-size-2">Design judgment</h3>
    <p>I balanced modernization with operational stability. Internal tools like this are easy to deprioritize—but 2000+ content designers rely on Whitehall every day to keep GOV.UK running. Getting it right mattered just as much as any user-facing product—and it had to ship fast.</p>
  </section>
  
  <section>
    <h3 class="font-size-2">Design decisions</h3>
    <ul class="list-extra-space">
      <li><strong>Replaced legacy components</strong> with GOV.UK Design System equivalents to improve consistency and accessibility</li>
      <li><strong>Simplified publishing flows</strong> based on prior research and usability findings</li>
      <li><strong>Redesigned high-friction patterns</strong> to reduce cognitive load and prevent errors</li>
      <li><strong>Shipped incrementally</strong> on a weekly cadence, validating usability with content designers before rollout</li>
    </ul>
  </section>
  
  <section>
    <h3 class="font-size-2">Impact</h3>
    <ul class="list-extra-space">
      <li><strong>Adopted across government</strong> publishing teams in multiple departments</li>
      <li><strong>Reduced publishing errors:</strong> Users reported faster, more confident publishing in post-launch interviews</li>
      <li><strong>Established baseline patterns</strong> that other GDS publishing tools later adopted, reducing future design and engineering decisions across teams</li>
    </ul>
  </section>
</section>


<section>
  <h2 class="font-size-3">COVID-19 Postcode Checker</h2>
  <div class="intro">
    <p>In late 2020, COVID-19 restrictions changed frequently and varied by location. Guidance was often difficult to interpret, creating confusion at a time when clarity directly affected public trust and compliance.</p>
    <p>I joined the GDS emergency response team as the sole product designer, responsible for designing a service that could deliver clear, location-specific guidance under extreme time constraints and evolving policy requirements.</p>
  </div>

  <section>
    <h3 class="font-size-2">Design judgment</h3>
    <p>I optimized for speed and clarity over completeness, accepting reduced scope in order to support confident decision-making for users under stress.</p>
  </section>

  <section>
    <h3 class="font-size-2">Design decisions</h3>
    <ul class="list-extra-space">
      <li><strong>Postcode-first entry</strong> to eliminate ambiguity and avoid complex regional mapping</li>
      <li><strong>Summary-first results</strong> focused on what users could and couldn't do, with progressive disclosure for detail</li>
      <li><strong>High-fidelity prototyping</strong> in code using the <a href="https://prototype-kit.service.gov.uk/docs/">GOV.UK Prototype Kit</a> to validate user-flow, accessibility, content behavior, and edge cases during user testing sessions</li>
    </ul>
  </section>

  <section>
    <h3 class="font-size-2">Impact</h3>
    <ul class="list-extra-space">
      <li><strong>100% task success in testing:</strong> Participants consistently understood their local restrictions and the restrictions of where they would be travelling to</li>
      <li><strong>Highlighted design for emotional context</strong> in high-stakes scenarios as a critical consideration</li>
      <li><strong>Influenced infrastructure investment:</strong> The service didn't launch due to technical limitations, but the work proved the design approach and directly influenced leadership's decision to invest in scalable, real-time systems for future emergencies. The prototypes became the reference point for those conversations.</li>
    </ul>
  </section>
</section>