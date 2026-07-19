// IIEC Innovation Competition 2026 - Segment Database
const competitionSegments = [
    {
        id: "project-showcasing",
        title: "Project Showcasing",
        shortDesc: "Exhibit your engineering projects, hardware innovations, and innovative research to industry experts.",
        fullDesc: "Project Showcasing is the premier arena of IIEC 2026 for students and researchers to display physical projects, hardware-software integrations, and novel mechanical prototypes. Participants will demonstrate their creations to a panel of academic and industry professionals, receiving expert feedback and networking with tech leaders. Projects are evaluated on innovation, social impact, technical feasibility, and presentation quality.",
        teamSize: "Up to 3 members (minimum 1)",
        fee: "1000 BDT per team",
        prizePool: "Champion: 5000 BDT, Runner-Up: 3000 BDT, 2nd Runner-Up: 2000 BDT",
        rulebookLink: "#",
        regLink: "https://forms.gle/GHfEpTw4JuqJbNLVA"
    },
    {
        id: "poster-presentation",
        title: "Poster Presentation",
        shortDesc: "Present your academic research, theoretical solutions, or industrial applications visually.",
        fullDesc: "The Poster Presentation segment allows students to convey complex scientific concepts, technical solutions, and academic findings using visual posters. Showcase your research methodology, clarity of thought, data visualization, and oral presentation skills before judges. Ideal for presenting research papers, capstone projects, or innovative design concepts.",
        teamSize: "Up to 2 members (minimum 1)",
        fee: "500 BDT per team",
        prizePool: "Champion: 2500 BDT, Runner-Up: 1500 BDT, 2nd Runner-Up: 1000 BDT",
        rulebookLink: "#",
        regLink: "https://forms.gle/Uqoa64gp9vdzWoXU6"
    },
    {
        id: "line-following-robot",
        title: "Line Following Robot",
        shortDesc: "Build autonomous robots designed to navigate complex paths with loops, gaps, and obstacles in record time.",
        fullDesc: "A test of pure robotics speed and precision control. Build an autonomous vehicle that can track a line on a contrasting surface. The custom-designed track features sharp turns, intersections, bridges, loops, and breaks to test sensor calibration, speed regulation, and pathfinding logic. Time is of the essence, and penalties are applied for going off-track.",
        teamSize: "Solo or up to 3 members",
        rulebookLink: "#",
        regLink: "https://forms.gle/APrB9C32RnK2AdSi7"
    },
    {
        id: "soccer-bot",
        title: "Soccer Bot",
        shortDesc: "Build a manually controlled or autonomous robot to compete in thrilling soccer matches against opponents.",
        fullDesc: "Soccer Bot brings the adrenaline of sports to mechanical engineering. Teams design and deploy remote-controlled robots on a custom pitch to score goals against opponents. The competition tests mechanical durability, drivetrain responsiveness, grip, and team strategy. Expect intense collisions, fast dribbles, and tactical match-ups.",
        teamSize: "Up to 3 members (minimum 1)",
        fee: "1000 BDT per team",
        prizePool: "Champion: 5000 BDT, Runner-Up: 3000 BDT, 2nd Runner-Up: 2000 BDT",
        rulebookLink: "#",
        regLink: "https://forms.gle/WfwTSypPncWsBdyk8"
    },
    {
        id: "rc-racing",
        title: "RC Racing",
        shortDesc: "Design and race high-speed remote-controlled cars through an adrenaline-pumping obstacle course.",
        fullDesc: "Unleash raw power and drift skills on a custom-designed track featuring jumps, gravel, mud, ramps, and sharp curves. RC Racing tests chassis design, weight distribution, motor output, suspension calibration, and driving reflexes in time-trial heats and head-to-head races.",
        teamSize: "Up to 3 members (minimum 1)",
        fee: "1000 BDT per team",
        prizePool: "Champion: 5000 BDT, Runner-Up: 3000 BDT, 2nd Runner-Up: 2000 BDT",
        rulebookLink: "#",
        regLink: "https://forms.gle/kaZM8snuFtsLrRqA6"
    },
    {
        id: "hackathon",
        title: "Hackathon",
        shortDesc: "A high-stakes, 24-hour coding sprint to build innovative software solutions addressing real-world problems.",
        fullDesc: "An intensive software design and programming challenge. Teams are given real-world problem statements and must brainstorm, write, and deploy a working web, mobile, or desktop application within a strict 24-hour time limit. Projects are evaluated on code quality, UI/UX design, viability, and pitch delivery.",
        teamSize: "Solo or up to 3 members",
        fee: "1000 BDT per team",
        prizePool: "Champion: 5000 BDT, Runner-Up: 3000 BDT, 2nd Runner-Up: 2000 BDT",
        rulebookLink: "#",
        regLink: "https://forms.gle/iYvsJ3S8Fc4o8xiQ7"
    },
    {
        id: "truss-competition",
        title: "Truss Competition",
        shortDesc: "Design and build efficient bridges from balsa wood or popsicle sticks to test their load-bearing efficiency.",
        fullDesc: "A classic structural engineering challenge. Participants design and construct a model truss bridge using balsa wood and adhesive within strict dimension limits. The bridges are loaded to structural failure using a hydraulic press to determine the highest load-to-weight ratio.",
        teamSize: "Exactly 2 members",
        fee: "600 BDT per team",
        prizePool: "Champion: 2500 BDT, 1st Runner-Up: 2000 BDT, 2nd Runner-Up: 1500 BDT",
        rulebookLink: "#",
        regLink: "https://forms.gle/mmtcemfNJtnYFATi7"
    },
    {
        id: "seismic-challenge",
        title: "Seismic Challenge",
        shortDesc: "Test your architectural and structural designs against simulated earthquakes on our custom shake tables.",
        fullDesc: "Test your civil and structural designs under seismic conditions. Teams design multi-story structures using specified materials. The structural integrity is tested on a dynamic shake table simulating realistic earthquake vibrations. Points are awarded for survival, height, and material efficiency.",
        teamSize: "Solo or max 2 members",
        prizePool: "Champion: 3000 BDT, Runner-Up: 2500 BDT, 2nd Runner-Up: 1500 BDT",
        rulebookLink: "#",
        regLink: "https://forms.gle/XHpsNEeWiDFQ5iF19"
    },
    {
        id: "business-case-study",
        title: "Business Case Study",
        shortDesc: "Analyze challenging real-life corporate scenarios and present strategic solutions to a panel of expert judges.",
        fullDesc: "A premium business contest where teams analyze complex, real-life corporate dilemmas containing operational failures, financial strain, or market expansion questions. Teams must develop structured, data-driven expansion strategies and pitch them to a board of corporate leaders.",
        teamSize: "Exactly 2 members",
        fee: "500 BDT per team",
        prizePool: "Champion: 3000 BDT, Runner-Up: 2500 BDT, 2nd Runner-Up: 1500 BDT",
        rulebookLink: "#",
        regLink: "https://forms.gle/vJ426Sbcza3tdqeL6"
    },
    {
        id: "idea-pitching",
        title: "Idea Pitching",
        shortDesc: "Pitch your revolutionary startup or product concepts to venture capitalists and entrepreneurship mentors.",
        fullDesc: "The launchpad for new entrepreneurs. Pitch your innovative product concepts or startup strategies to a jury of venture capitalists, business incubators, and industry experts. Focus on problem identification, market sizing, revenue models, scalability, and the team's capacity to execute.",
        teamSize: "Up to 2 members (minimum 1)",
        fee: "400 BDT per team",
        requiresPayment: false,
        prizePool: "Top 5 Teams receive 1000 BDT each",
        rulebookLink: "#",
        regLink: "https://forms.gle/XSaReBPbaqkfYANe6"
    }
];
