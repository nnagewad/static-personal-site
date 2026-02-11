---
order: 2
layout: 'layouts/case-study.njk'
headlineCaption: Case studies
title:
  Government Digital Service
subTitle:
  Building simple, trustworthy systems at scale
metaDesc:
  "Three projects from my time at the Government Digital Service: a publishing design guide, a CMS upgrade, and COVID-19 emergency services."
opengraphImage:
  caseStudy_gds
opengraphImageAltText:
  Illustration of a bearded man with glasses beside the "Government Digital Service" logo.
---
<div class="intro">
  <p>At the Government Digital Service (GDS), I designed products and systems used by millions of people across <a href="https://gov.uk">GOV.UK</a>. That's where I learned what design actually means: building products and services people can trust.</p>

  <p><strong>Three projects that demonstrate my range:</strong></p>
  <ol class="list-extra-space">
  {% for item in collections.gdsCaseStudies %}
  <li><a href="{{ item.url }}">{{ item.title }}</a>: {{ item.subTitle }}</li>
  {% endfor %}
  </ol>
</div>