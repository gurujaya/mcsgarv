import type { FAQ, FAQCategory } from "./types";

/**
 * Frequently asked questions. Answers support plain text; use two newlines for
 * a paragraph break. Keep answers short and link to a page for detail.
 */
export const faq: FAQ[] = [
  {
    category: "general",
    q: "What is the SGA?",
    a: "The Student Government Association is the official representative body for all students on the Montgomery College Rockville Campus. Each of MC's three campuses (Germantown, Rockville, and Takoma Park/Silver Spring) has its own SGA. Rockville is the largest campus, with about 15,000 students each semester.",
  },
  {
    category: "general",
    q: "What does SGA actually do?",
    a: "Four things. We represent the student body to the College administration. We recommend how student activity fees are spent through the Budget Panel. We gather student opinions on official policies and priorities. And we develop activities and events that make the academic and social experience on campus better.",
  },
  {
    category: "meetings",
    q: "Who can attend SGA meetings?",
    a: "Everyone. Open meetings are every other Monday from 4:00 to 6:00 PM in the Office of Student Life (SV 104A). Check the Events page for the next date. You do not need to be a senator, sign up, or stay the whole time.",
  },
  {
    category: "meetings",
    q: "How do I raise a concern or idea?",
    a: "Three ways. Come to a Monday open meeting and speak during open floor. Email sgarv@montgomerycollege.edu. Or use the form on the Contact page, which goes to the SGA Secretary. We will tell you which senator or committee is picking it up.",
  },
  {
    category: "joining",
    q: "How do I become a Senator-at-Large?",
    a: "You need to be in good standing with the College and free from Code of Conduct violations (minor infractions are at the discretion of the Dean of Student Affairs), keep a cumulative GPA of 2.0 or higher each semester while in office, and attend every SGA meeting (every other Monday).\n\nTurn in a completed application to the Office of Student Life. Candidates interview with current SGA members. Senator positions are elected. See the Get Involved page for the current cycle.",
  },
  {
    category: "joining",
    q: "How do I join the Student Activities Board (SAB)?",
    a: "SAB accepts applications on an ongoing basis, so you can join at any point in the semester. Email RVSAB@montgomerycollege.edu or submit the SAB application form. You do not need to be a senator.",
  },
  {
    category: "joining",
    q: "Can I join a committee without being a senator?",
    a: "Yes. Community Service, Food, Public Outreach, and SAB are open to all students. Budget Panel and Ethics are made up of senators. Come to a Monday meeting and ask for the committee you are interested in.",
  },
  {
    category: "joining",
    q: "What is the time commitment?",
    a: "Senators attend the open meeting every other Monday (4–6 PM) plus committee work, which is usually one to three hours a week depending on what is going on. Committee-only members commit to their committee's schedule. Officers put in more.",
  },
  {
    category: "joining",
    q: "Does SGA pay?",
    a: "TODO: confirm whether officer and senator positions receive a stipend, tuition credit, or are volunteer, and update this answer.",
  },
  {
    category: "funding",
    q: "How does my club get funding?",
    a: "Recognized clubs request money through the SGA Budget Panel. Submit a request describing the event, the budget, and how it benefits students. The panel reviews whether it promotes student engagement and strengthens campus community, then recommends an amount. Start on the Funding page.",
  },
  {
    category: "funding",
    q: "How far in advance should my club apply for funding?",
    a: "TODO: confirm the Budget Panel lead time (for example, at least three weeks before the event) and any semester deadlines.",
  },
  {
    category: "general",
    q: "Where is the SGA office?",
    a: "Inside the Office of Student Life in the Long Nguyen and Kimmy Duong Student Services Center (SV), room SV 104A, at 51 Mannakee Street, Rockville, MD 20850. Student Life is open Monday through Friday, 8:30 AM to 5:00 PM.",
  },
  {
    category: "general",
    q: "Is SGA part of the College administration?",
    a: "No. SGA is run by students and elected by students. It works closely with College leadership and the Office of Student Life, but it exists to represent students to the administration, not the other way around.",
  },
];

export const faqCategories: Record<FAQCategory, string> = {
  general: "General",
  meetings: "Meetings",
  joining: "Joining",
  funding: "Funding",
};
