import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ArrowLeft, Heart, MapPin, Users, Calendar, BookOpen, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const PastorBiography = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const timelineEvents = [
    {
      year: "1950s",
      age: "Birth",
      title: "Born in Tamil Nadu",
      description: "Born into a poor Christian village family as the youngest of 6 children. Parents prioritized education despite limited means.",
      icon: <Heart className="w-4 h-4" />,
      type: "early"
    },
    {
      year: "1952",
      age: "Age 2",
      title: "Father's Death & Divine Dedication",
      description: "Father passed away. Mother dedicated young Reuben to God's ministry - a decision that would shape his entire destiny.",
      icon: <BookOpen className="w-4 h-4" />,
      type: "calling"
    },
    {
      year: "1960s-70s",
      age: "Youth",
      title: "Years of Rebellion",
      description: "Struggled with his calling, leading a double life. Outwardly dutiful but inwardly rejecting God's plan for his life.",
      icon: <MapPin className="w-4 h-4" />,
      type: "struggle"
    },
    {
      year: "1967",
      age: "Age 17",
      title: "Rock Bottom in Chennai",
      description: "Ran away from home after rejecting his faith. Betrayed by friends, lived on streets for 3 days without food, contemplated suicide.",
      icon: <MapPin className="w-4 h-4" />,
      type: "struggle"
    },
    {
      year: "1967",
      age: "Age 17",
      title: "Divine Encounter on the Beach",
      description: "About to end his life, heard Ecclesiastes 11:9 at a beach gospel meeting. Surrendered his life to Christ that very night.",
      icon: <Heart className="w-4 h-4" />,
      type: "calling"
    },
    {
      year: "1967-69",
      age: "Age 17-19",
      title: "Bible Seminary",
      description: "Worked as gardener while studying God's Word. Gained tuition, boarding, and accommodation through dedicated service.",
      icon: <BookOpen className="w-4 h-4" />,
      type: "training"
    },
    {
      year: "1970s",
      age: "Early 20s",
      title: "Pioneer Missionary to Tribal Groups",
      description: "5 years of groundbreaking missionary work among the Onge and Jarawa tribes in Andaman & Nicobar Islands.",
      icon: <Globe className="w-4 h-4" />,
      type: "ministry"
    },
    {
      year: "1980s",
      age: "30s",
      title: "Bible School Teacher & Roving Preacher",
      description: "Taught in Bible School, completed missionary outreach course. Traveled as charismatic preacher to isolated communities.",
      icon: <Users className="w-4 h-4" />,
      type: "ministry"
    },
    {
      year: "1985",
      age: "35",
      title: "Marriage to Flora",
      description: "Married Flora, who became his ministry partner and support. Together they would build a family devoted to God's service.",
      icon: <Heart className="w-4 h-4" />,
      type: "family"
    },
    {
      year: "1987",
      age: "37",
      title: "Settled in Bangalore",
      description: "God led the family to Bangalore where their children Jim Elliot, Sabina Livingbel, and Ruby Carole were born.",
      icon: <MapPin className="w-4 h-4" />,
      type: "family"
    },
    {
      year: "1990",
      age: "40",
      title: "Founded Agape Bible Church",
      description: "Started with just 3 families, planted the seeds of what would become a thriving church community in Bangalore.",
      icon: <Users className="w-4 h-4" />,
      type: "ministry"
    },
    {
      year: "2024",
      age: "Present",
      title: "Archbishop & Senior Pastor",
      description: "Leading 1000+ believers, 250 children, trained hundreds of pastors, overseeing 6 churches and multiple ministries.",
      icon: <Globe className="w-4 h-4" />,
      type: "ministry"
    }
  ];

  const familyMembers = [
    {
      name: "Archbishop Dr. Reuben M. Sathiyaraj",
      role: "Senior Pastor & Founding Archbishop",
      description: "Visionary leader with over 50 years of ministry experience"
    },
    {
      name: "Flora Sathiyaraj",
      role: "Pastor's Wife & Ministry Partner",
      description: "Devoted supporter of all pastoral activities and family cornerstone"
    },
    {
      name: "Jim Elliot Sathiyaraj",
      role: "First Child",
      description: "Named after the famous missionary Jim Elliot"
    },
    {
      name: "Sabina Livingbel Sathiyaraj",
      role: "Daughter",
      description: "Part of the second generation carrying forward the family legacy"
    },
    {
      name: "Ruby Carole Sathiyaraj",
      role: "Youngest Child",
      description: "Youngest member of the Sathiyaraj family"
    }
  ];

  const ministryStats = [
    { number: "50+", label: "Years of Ministry" },
    { number: "1000+", label: "Church Members" },
    { number: "250+", label: "Children Ministered" },
    { number: "100+", label: "Pastors Trained" },
    { number: "6", label: "Churches Overseen" },
    { number: "10", label: "Co-Pastors" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to Content Link (for accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-primary text-primary-foreground px-4 py-2 rounded shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        tabIndex={0}
      >
        Skip to main content
      </a>
      {/* Header Navigation */}
      <nav className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-lg" aria-label="Main Navigation">
        <div className="container-wide mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2" aria-label="Back to Main Site">
                <ArrowLeft className="w-4 h-4" />
                Back to Main Site
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Pastor Biography</h1>
            <Button onClick={scrollToTop} variant="outline" size="sm" aria-label="Scroll to Top">
              Top
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content" tabIndex={-1} aria-label="Main Content">
      {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/60 to-card">
        <div className="container-wide mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-hero font-bold mb-6">Archbishop Dr. Reuben M. Sathiyaraj</h1>
            <p className="text-xl md:text-section-title text-muted-foreground mb-8">
              Founding Senior Pastor of Agape Bible Fellowship and Churches
            </p>
              <p className="text-lg md:text-large text-foreground leading-relaxed mb-12">
              A remarkable journey from rebellion to redemption, from the streets of Chennai to the tribal islands of Andaman, 
              from a broken young man to a transformational leader who has planted hundreds of churches and trained countless missionaries.
            </p>
            
            {/* Ministry Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
              {ministryStats.map((stat, index) => (
                <Card key={index} className="text-center p-4">
                  <CardContent className="p-0">
                      <div className="text-2xl font-bold text-foreground mb-1">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Life Verse */}
        <section className="py-16 bg-card text-foreground">
        <div className="container-wide mx-auto px-6">
            <Card className="max-w-4xl mx-auto p-8 text-center bg-gradient-to-r from-primary/10 to-card">
            <CardContent className="p-0">
              <BookOpen className="w-12 h-12 mx-auto mb-6 text-primary" />
              <blockquote className="text-xl italic mb-4">
                "For though I preach the gospel, I have nothing to glory of: for necessity is laid upon me; 
                yea, woe is unto me, if I preach not the gospel!"
              </blockquote>
              <cite className="text-lg font-semibold text-primary">1 Corinthians 9:16</cite>
              <p className="text-muted-foreground mt-4">Pastor Reuben's life verse that inspired his calling to ministry</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Timeline - Black Background for Emphasis */}
      <section className="py-16 bg-black text-white">
        <div className="container-wide mx-auto px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-semibold text-center mb-12 text-white"
            >
              ⏳ Life Timeline: A Journey of Faith
            </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex gap-6 mb-8 group">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold
                      ${event.type === 'early' ? 'bg-primary' : 
                        event.type === 'calling' ? 'bg-green-600' :
                        event.type === 'struggle' ? 'bg-red-600' :
                        event.type === 'training' ? 'bg-purple-600' :
                        event.type === 'family' ? 'bg-gold-600' : 'bg-orange-600'}
                  `}>
                    {event.icon}
                  </div>
                  {index < timelineEvents.length - 1 && (
                    <div className="w-0.5 h-16 bg-gray-600 mt-2"></div>
                  )}
                </div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="flex-1 group-hover:shadow-xl transition-all bg-gray-900/80 text-white border border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-lg font-bold text-gold-400">{event.year}</span>
                        <span className="text-sm bg-gray-700 text-gray-200 px-2 py-1 rounded">{event.age}</span>
                      </div>
                      <h3 className="text-2xl text-white font-semibold mb-2">{event.title}</h3>
                      <p className="text-gray-200 leading-relaxed">{event.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Section */}
        <section className="py-16 bg-card text-foreground">
        <div className="container-wide mx-auto px-6">
          <h2 className="text-xl md:text-section-title font-bold text-center mb-12">The Sathiyaraj Family</h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-large text-center mb-12 text-muted-foreground">
              A family united in faith and ministry, each member contributing to the advancement of God's kingdom.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {familyMembers.map((member, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow bg-card text-foreground">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full Story - Black Background for Key Narrative */}
      <section className="py-16 bg-black text-white">
        <div className="container-wide mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-section-title font-bold text-center mb-12 text-white"
          >
            📖 The Complete Story
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 mb-8 bg-gray-900/80 text-white border border-gray-700">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold mb-4 text-white">Early Life & Divine Calling</h3>
                <p className="mb-4 text-gray-200">
                  Reuben Sathiyaraj was born in the State of Tamil Nadu into a poor Christian village family as the youngest of 6 children: 2 girls and 4 boys. 
                  His parents, though not highly educated, believed deeply in the importance of education and ensured all their children attended the Church of South India Christian school.
                </p>
                <p className="mb-4 text-gray-200">
                  When Reuben was just 2 years old, his father died—an event that would profoundly shape his destiny. In her grief and faith, 
                  his mother dedicated him to God's ministry, a single act that would influence his entire future life. Even as a child and young man, 
                  he rebelled against this dedication, living two distinctly different lives.
                </p>
                <p className="text-gray-200">
                  To his mother, he appeared to be the dutiful, God-fearing son, but inside he was burning with rebellion, rejecting the divine calling 
                  that had been placed upon his life before he could even understand it.
                </p>
              </CardContent>
            </Card>

              <Card className="p-8 mb-8 bg-gray-900/80 text-white border border-gray-700">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold mb-4 text-white">The Prodigal Years</h3>
                <p className="mb-4 text-gray-200">
                  When his education was completed, Reuben finally declared his rejection of faith to his mother. The confrontation was explosive—
                  in his rage, he picked up a huge boulder, threw it at her, and ran away from home to Chennai, the capital of Tamil Nadu.
                </p>
                <p className="mb-4 text-gray-200">
                  In Chennai, he mixed with rough crowds, having no direction, no faith, and no family. He started a business with two friends 
                  who ultimately robbed and abandoned him. For three days, he roamed the streets of Chennai—penniless, dejected, and destitute. 
                  He was so hungry that he watched a banana seller, hoping someone would take pity on him, even contemplating eating banana skins.
                </p>
                <p className="text-gray-200">
                  The Parable of the Prodigal Son kept running through his head: "And he would fain have filled his belly with the husks that 
                  the swine did eat: and no man gave unto him" (Luke 15:16).
                </p>
              </CardContent>
            </Card>

              <Card className="p-8 mb-8 bg-gray-900/80 text-white border border-gray-700">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold mb-4 text-white">Divine Encounter</h3>
                <p className="mb-4 text-gray-200">
                  Deep despair and depression overwhelmed him, and he decided to end his life by walking into the sea. As he headed toward the water, 
                  there was a Gospel meeting in progress on the beach. He recognized the preacher who was quoting Ecclesiastes 11:9: 
                  "Rejoice, O young man, in thy youth; and let thy heart cheer thee in the days of thy youth, and walk in the ways of thine heart, 
                  and in the sight of thine eyes: but know thou, that for all these things God will bring thee into judgment."
                </p>
                <p className="mb-4 text-gray-200">
                  This same verse had angered him before—he had once thrown his Bible to the ground, stamping and kicking it like a football. 
                  Hearing it again brought vivid memories flooding back. Though he felt angry and wanted his suicide plan to succeed, 
                  God had other plans. That very night, instead of ending his life, he accepted the Lord and committed his life to God's glory.
                </p>
              </CardContent>
            </Card>

              <Card className="p-8 mb-8 bg-gray-900/80 text-white border border-gray-700">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold mb-4 text-white">Reconciliation & Calling</h3>
                <p className="mb-4 text-gray-200">
                  Like the Prodigal Son, thoughts of reconciliation with his mother and family began creeping into his mind. The harder he tried 
                  to push these thoughts away, the stronger they became. He decided to write to his mother, and like in the parable, 
                  she welcomed him home with open arms.
                </p>
                <p className="mb-4 text-gray-200">
                  His faith and belief in Jesus Christ flooded back. He started working in a laboratory as a quality controller, 
                  but felt an irresistible pull to spread God's word and preach the Gospel. His life verse, 1 Corinthians 9:16, 
                  became his driving inspiration: "For though I preach the gospel, I have nothing to glory of: for necessity is laid upon me; 
                  yea, woe is unto me, if I preach not the gospel!"
                </p>
              </CardContent>
            </Card>

              <Card className="p-8 mb-8 bg-gray-900/80 text-white border border-gray-700">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold mb-4 text-white">Testing & Seminary</h3>
                <p className="mb-4 text-gray-200">
                  Swallowing his pride, he approached his elder brother, who was already a pastor, for spiritual guidance. His brother initially 
                  laughed at him, saying there were already two brothers in ministry and that was enough. However, he decided to test Reuben's 
                  commitment by challenging him to fast in a locked room for three days. If his calling remained strong, he would help.
                </p>
                <p className="mb-4 text-gray-200">
                  After three days of fasting, Reuben's commitment to ministry was stronger than ever. But when he shared this with his brother, 
                  his brother flew into a rage, threw money at him, and ordered him out of the house. Reuben took only the 10 Rupees needed for bus fare 
                  and returned the rest. At age 17, in the middle of the night, he left home again—this time for God's service.
                </p>
              </CardContent>
            </Card>

              <Card className="p-8 mb-8 bg-gray-900/80 text-white border border-gray-700">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold mb-4 text-white">Pioneer Missionary Work</h3>
                <p className="mb-4 text-gray-200">
                  Determined to study God's Word, he approached a Bible Seminary in Tamil Nadu, which accepted him for a 2-year course. 
                  Though penniless, he had direction and commitment. He worked as a gardener in the seminary grounds in exchange for tuition, 
                  boarding, and accommodation.
                </p>
                <p className="mb-4 text-gray-200">
                  After completing Bible Seminary, he was sent to the Andaman & Nicobar Islands for 5 years as a pioneer missionary working among 
                  primitive tribal groups. He was one of the first missionaries to enter this spiritual wilderness, where tribal people initially 
                  resisted giving up their pagan rituals to accept Christ.
                </p>
                <p className="text-gray-200">
                  Despite his youth, he showed remarkable discernment and leadership skills, leading his missionary team and preaching with such 
                  fire and authenticity that the tribals could identify his biblical teachings with their own cultures and way of life. 
                  Many churches were planted during this time and continue expanding today.
                </p>
              </CardContent>
            </Card>

              <Card className="p-8 mb-8 bg-gray-900/80 text-white border border-gray-700">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold mb-4 text-white">Ministry in Bangalore</h3>
                <p className="mb-4 text-gray-200">
                  When he returned to Tamil Nadu, he taught in Bible School and completed a 2-year correspondence course on missionary outreach. 
                  Throughout this time, he maintained a burning desire and vision to preach the Gospel throughout spiritually barren India. 
                  For several years, he served as a roving charismatic preacher, seeking out isolated communities and teaching God's Word.
                </p>
                <p className="mb-4 text-gray-200">
                  In 1985, he married Flora, who became his devoted ministry partner. They settled in Bangalore in 1987, where their three children—
                  Jim Elliot, Sabina Livingbel, and Ruby Carole—were born. Flora fully supports her husband and assists in many pastoral activities.
                </p>
                <p className="text-gray-200">
                  In 1990, he planted the seeds for what is now the growing and spiritually vibrant Agape Bible Church. From humble beginnings 
                  with just 3 families, the church now ministers to over 1000 believers and 250 children. His ministry extends beyond the home church 
                  to include training missionaries and lay leaders, running rehabilitation homes for street children and rag-pickers, 
                  the Eunuch ministry, and overseeing 5 daughter churches with 10 co-pastors.
                </p>
              </CardContent>
            </Card>

              <Card className="p-8 bg-card text-foreground">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold mb-4 text-white">Legacy & Vision</h3>
                <p className="mb-4 text-gray-200">
                  Archbishop Dr. Reuben Sathiyaraj has particular empathy for society's marginalized—especially street children and rag-pickers. 
                  He sees potential in those whom society has thrown away and rejected. His respect and care for his God-given gifts motivate 
                  his fellow workers and inspire transformation in the most unlikely places.
                </p>
                <p className="mb-4 text-gray-200">
                  The spiritual growth in the slum areas of Bangalore is entirely due to the commitment and God-given gifts of this dynamic 
                  and compassionate man. He truly embodies what it means to be "a man of the people"—one who has experienced the depths of 
                  despair and the heights of God's grace.
                </p>
                <p className="italic text-center text-gold-400 font-semibold">
                  "To God be all the Glory and honor!"
                </p>
                  <p className="text-sm text-gray-300 text-center mt-4">
                  Biography compiled from the account by Mrs. Carole Edgecox from Isle of Man, 
                  who served as a voluntary nurse in Bangalore at the ACC ministry among street children and rag pickers.
                </p>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-wide mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold mb-6">Continue the Mission</h2>
          <p className="text-lg md:text-large mb-8 max-w-2xl mx-auto">
            Pastor Reuben's story continues through the lives he touches and the churches he plants. 
            Join us in supporting this ongoing ministry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#ministry">
              <Button size="lg" variant="secondary">
                Learn About Our Ministries
              </Button>
            </Link>
            <Link to="/#contact">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary hover:bg-accent">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </main>
      {/* If there is a footer, wrap it in <footer aria-label="Site Footer"> ... </footer> */}
    </div>
  );
};

export default PastorBiography;