document.addEventListener("DOMContentLoaded", () => {
  const initializeData = () => {
    if (!localStorage.getItem("tindogUsers")) {
      const sampleUsers = {
        master_admin: {
          firstName: "Roel Anthony",
          lastName: "Saavedra",
          displayName: "Master Admin",
          email: "admin@test.com",
          password: "Admin123",
          plan: "N/A",
          status: "active",
          role: "admin",
          masterAdmin: true,
        },
        saavedra_roel: {
          firstName: "Roel Anthony",
          lastName: "Saavedra",
          email: "roel.saavedra@example.com",
          password: "Test123",
          plan: "labrador",
          status: "active",
          role: "user",
          location: "Consolacion, Cebu",
          dogName: "Jorjee",
          dogBreed: "Shih Tzu",
          dogSex: "female",
          dogSize: "small",
          age: 3,
          bio: "Energetic and playful, loves chasing balls and long walks. Looking for a companion to explore with!",
          ownerBio:
            "Guides our technical direction and translates creative concepts into functional, polished applications.",
          signUpDate: "Jul 01, 2024",
          lastSeen: "5 minutes ago",
          dogAvatar: "./assets/images/jorjee-one.jpg",
          dogCoverPhoto: "./assets/images/jorjee-three.jpg",
        },
        cruz_juan: {
          firstName: "Juan",
          lastName: "Cruz",
          displayName: "Juan C.",
          email: "juan.cruz@example.com",
          password: "Password123",
          plan: "N/A",
          status: "active",
          role: "admin",
        },
        santos_maria: {
          firstName: "Maria",
          lastName: "Santos",
          email: "maria.santos@example.com",
          password: "Password123",
          plan: "labrador",
          status: "active",
          role: "user",
          location: "Mandaue City, Cebu",
          dogName: "Kisses",
          dogBreed: "Shih Tzu",
          dogSex: "female",
          dogSize: "small",
          age: 5,
          bio: "A gentle soul who loves cuddles more than anything. My favorite activity is napping in a sunbeam.",
          signUpDate: "Jan 15, 2024",
          lastSeen: "Yesterday",
          dogAvatar: "https://placedog.net/500/500?id=51",
          dogCoverPhoto: "https://placedog.net/1200/400?id=52",
        },
        gonzales_pedro: {
          firstName: "Pedro",
          lastName: "Gonzales",
          email: "pedro.g@example.com",
          password: "Password123",
          plan: "chihuahua",
          status: "suspended",
          role: "user",
          location: "Lapu-Lapu City, Cebu",
          dogName: "Max",
          dogBreed: "Pomeranian",
          dogSex: "male",
          dogSize: "small",
          age: 2,
          bio: "Small but mighty! I've got a big personality and love to be the center of attention. Let's go on an adventure!",
          signUpDate: "Mar 01, 2024",
          lastSeen: "1 week ago",
          dogAvatar: "https://placedog.net/500/500?id=21",
          dogCoverPhoto: "https://placedog.net/1200/400?id=22",
        },
        reyes_sofia: {
          firstName: "Sofia",
          lastName: "Reyes",
          email: "sofia.reyes@example.com",
          password: "Password123",
          plan: "labrador",
          status: "active",
          role: "user",
          location: "Talisay City, Cebu",
          dogName: "Bella",
          dogBreed: "Golden Retriever",
          dogSex: "female",
          dogSize: "large",
          age: 4,
          bio: "I love swimming, fetching, and making new friends. I'm a happy-go-lucky girl looking for a playmate.",
          signUpDate: "Jun 10, 2024",
          lastSeen: "3 days ago",
          dogAvatar: "https://placedog.net/500/500?id=41",
          dogCoverPhoto: "https://placedog.net/1200/400?id=42",
        },
        tan_andres: {
          firstName: "Andres",
          lastName: "Tan",
          email: "andres.tan@example.com",
          password: "Password123",
          plan: "chihuahua",
          status: "banned",
          role: "user",
          location: "Consolacion, Cebu",
          dogName: "Rocky",
          dogBreed: "Bulldog",
          dogSex: "male",
          dogSize: "medium",
          age: 6,
          bio: "A bit of a couch potato, but I'm very loyal. I enjoy short walks and long naps.",
          signUpDate: "Jul 04, 2024",
          lastSeen: "1 month ago",
          dogAvatar: "https://placedog.net/500/500?id=61",
          dogCoverPhoto: "https://placedog.net/1200/400?id=62",
        },
      };
      localStorage.setItem("tindogUsers", JSON.stringify(sampleUsers));
    }

    if (!localStorage.getItem("tindogReports")) {
      const sampleReports = [
        {
          id: 1,
          reportedUserId: "tan_andres",
          reportedByUserId: "santos_maria",
          reason: "Inappropriate Photo",
          date: "Sep 22, 2025",
          status: "banned",
        },
        {
          id: 2,
          reportedUserId: "gonzales_pedro",
          reportedByUserId: "cruz_juan",
          reason: "Spam / Bot",
          date: "Sep 21, 2025",
          status: "suspended",
        },
        {
          id: 3,
          reportedUserId: "santos_maria",
          reportedByUserId: "gonzales_pedro",
          reason: "Harassment",
          date: "Sep 20, 2025",
          status: "dismissed",
        },
        {
          id: 4,
          reportedUserId: "reyes_sofia",
          reportedByUserId: "tan_andres",
          reason: "Fake Profile",
          date: "Sep 22, 2025",
          status: "open",
        },
      ];
      localStorage.setItem("tindogReports", JSON.stringify(sampleReports));
    }

    if (!localStorage.getItem("tindogLikes")) {
      const sampleLikes = {
        saavedra_roel: ["santos_maria", "reyes_sofia"],
        santos_maria: ["saavedra_roel"],
        reyes_sofia: ["saavedra_roel"],
        gonzales_pedro: ["tan_andres"],
      };
      localStorage.setItem("tindogLikes", JSON.stringify(sampleLikes));
    }

    if (!localStorage.getItem("tindogMessages")) {
      const sampleMessages = {
        bruce: {
          name: "Bruce",
          avatar: "./assets/images/bruce.jpg",
          messages: [
            {
              type: "received",
              text: "Hey! Is your human free for a playdate this weekend?",
              time: "5:30 PM",
              read: false,
            },
            {
              type: "sent",
              text: "Woof! Yes! I would love that!",
              time: "5:31 PM",
              read: true,
            },
            {
              type: "received",
              text: "Great! How about the dog park on Saturday around 3 PM?",
              time: "5:32 PM",
              read: false,
            },
            {
              type: "sent",
              text: "Sure, let's meet at the park!",
              time: "5:42 PM",
              read: true,
            },
          ],
        },
        pebbles: {
          name: "Pebbles",
          avatar: "./assets/images/dog-img.jpg",
          messages: [
            {
              type: "received",
              text: "Haha, my human is so slow.",
              time: "2h ago",
              read: true,
            },
            {
              type: "sent",
              text: "Mine too! They can never keep up on walks.",
              time: "1h ago",
              read: true,
            },
          ],
        },
      };
      localStorage.setItem("tindogMessages", JSON.stringify(sampleMessages));
    }
  };

  initializeData();
});
