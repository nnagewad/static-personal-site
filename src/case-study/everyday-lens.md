---
layout: 'layouts/case-study.njk'
title:
  Everyday Lens
metaDesc: 'update'
image: home
imageAltText:
  3D animated emoji of a friendly and approachable person with a black tuque, glasses, and a beard
subTitle:
  Building a personal publishing system with AI collaboration
---
<section>
  <h2 class="font-size-3">Context</h2>
  <p>I've always enjoyed taking photos, but I rarely shared them. When I did post on Instagram, my work disappeared into the algorithm—likes mattered more than the photos themselves. I wanted somewhere to share my work on my own terms.</p>
  <p>But beyond finding a home for my photos, I was curious. Large language models were changing how people work with content, and I wanted to see firsthand what AI could actually do in a creative workflow. Could it handle the boring parts—titles, tags, descriptions—without losing my voice? That question drove the project as much as the publishing problem.</p>
  <p>So I built <a href="https://everydaylens.photos">Everyday Lens</a>.</p>
</section>

<section>
  <h2 class="font-size-3">Design judgment</h2>
  <p>I wanted the system to feel effortless—but I also wanted it to feel like mine. The terminal-inspired aesthetic wasn't just a style choice. It reflected what the tool actually is: something quiet, utilitarian, running in the background doing its job. No flashy interface needed. Just clean typography, high colour contrast, and the photos take front and center.</p>
  <p>That instinct—form follows function—comes directly from my years working on GOV.UK. It's become how I design everything.</p>
  <p>Built solo, in my own time, with no budget or team. I prioritized automation and ownership over polish and flexibility. The goal was to build something that would last—not just something that worked today. A system that removed friction entirely, while using AI as a collaborator rather than a replacement for creative decisions.</p>
</section>

<section>
  <h2 class="font-size-3">Design decisions</h2>
  <h3 class="font-size-2">Automation first</h3>
  <p>A script detects new photos, extracts camera metadata, and triggers AI-generated titles, alt text, and tags—reducing publishing time from 10 minutes (manually entering all the metadata) to under 60 seconds.</p>
  
  <h3 class="font-size-2">AI with guardrails</h3>
  <p>Claude generates the first draft of metadata. It's accurate about 80% of the time, but the 20% it gets wrong is often the most important content—personal stories, artistic intent, location significance. I made a deliberate choice to never let AI publish without review—accuracy without oversight isn't something I'm comfortable with. The review step keeps my voice in the work.</p>
  
  <h3 class="font-size-2">Full ownership</h3>
  <p>Everything—images, metadata, infrastructure—stays under my control. No platform lock-in.</p>
  
  <h3 class="font-size-2">Multi-channel distribution</h3>
  <p>Clean URLs, Open Graph previews, and RSS feeds. Anyone can access and subscribe without signing up to a social media platform.</p>
  
  <h3 class="font-size-2">Scalable and accessible design system</h3>
  <p>Terminal-inspired UI, high-contrast typography, and reusable components. WCAG 2.1 AA compliant from day one, influenced by GOV.UK design principles</p>
</section>

<section>
  <h2 class="font-size-3">Impact</h2>
  <ul class="list-extra-space ">
    <li><strong>80% AI accuracy baseline</strong> established for creative metadata generation</li>
    <li><strong>90+ Lighthouse scores</strong> across performance, accessibility, and SEO</li>
    <li><strong>Influenced how I think about AI collaboration</strong> — understanding where it adds value and where human judgment is irreplaceable</li>
  </ul>
</section>

<section>
  <h2 class="font-size-3">What I learned</h2>
  <p>I chose static generation over a CMS (performance over real-time updates), automation over customization (consistency over flexibility), and custom build over platforms (ownership over ease). These trade-offs reinforced that <strong>good design isn't just the interface—it's the systems underneath.</strong></p>
  <p><strong>AI needs human judgment in the loop.</strong> 80% accuracy sounds good until you realize the 20% failures are often the most important content. The review step turned AI from a shortcut into a genuine collaborator.</p>
  <p><strong>End-to-end ownership deepens design thinking.</strong> Controlling every layer—strategy, design, infrastructure, implementation—revealed how decisions cascade through systems in ways you can't see when you only own one piece.</p>
</section>