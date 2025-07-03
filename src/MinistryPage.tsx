import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Heart, Users, MapPin, Shield, Calendar, Clock, DollarSign, Globe, Home, GraduationCap, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const MinistryPage = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const ministryStats = [
    { number: "100+", label: "Missionaries Sent", icon: <Globe className="w-5 h-5" /> },
    { number: "6", label: "Churches Overseen", icon: <Home className="w-5 h-5" /> },
    { number: "70K", label: "Ragpickers in Bangalore", icon: <Users className="w-5 h-5" /> },
    { number: "65K", label: "Street Children", icon: <Heart className="w-5 h-5" /> },
    { number: "250+", label: "Children Ministered", icon: <GraduationCap className="w-5 h-5" /> },
    { number: "25%", label: "Recycled Materials", icon: <Shield className="w-5 h-5" /> }
  ];

  const challenges = [
    {
      title: "Health Risks",
      description: "Scabies, dysentery, tuberculosis, lice, ulcers, and STIs without proper medical care",
      icon: <Stethoscope className="w-6 h-6" />
    },
    {
      title: "Daily Survival",
      description: "Walking 20km daily, earning ₹25-₹75, competing with stray animals for scraps",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Exploitation",
      description: "Abuse by scrap dealers, forced prostitution, vulnerability to predators",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Social Rejection",
      description: "Seen as unwelcome burdens despite their vital contribution to society",
      icon: <Users className="w-6 h-6" />
    }
  ];

  const dailyRoutine = [
    { time: "Dawn", activity: "Begin daily scavenging rounds barefoot", earnings: "0" },
    { time: "Morning", activity: "Sort garbage: paper, plastic, metal, food waste", earnings: "₹10-20" },
    { time: "Afternoon", activity: "Continue collection, compete with animals", earnings: "₹15-25" },
    { time: "Evening", activity: "Sell to scrap dealers, often cheated", earnings: "₹25-75" },
    { time: "Night", activity: "Sleep on streets/graveyards, face exploitation", earnings: "0" }
  ];

  const ourApproach = [
    {
      title: "Safe Housing",
      description: "Provide secure shelter at Agape Children Centre for ages 5-12",
      icon: <Home className="w-6 h-6" />
    },
    {
      title: "Education & Skills",
      description: "Teach hygiene, social skills, and provide formal education",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      title: "Healthcare",
      description: "Medical treatment, psychological support, and rehabilitation",
      icon: <Stethoscope className="w-6 h-6" />
    },
    {
      title: "Spiritual Care",
      description: "Share God's love and hope for transformation and dignity",
      icon: <Heart className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container-wide mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/#ministry">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Main Site
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Our Ministries</h1>
            <Button onClick={scrollToTop} variant="outline" size="sm">
              Top
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-muted/30 py-4">
        <div className="container-wide mx-auto px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('missions')}>Church Missions</Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('planting')}>Church Planting</Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('children')}>Street Children</Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('centre')}>Children Centre</Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('approach')}>Our Approach</Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/20 to-primary/5">
        <div className="container-wide mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero font-bold mb-6">Transforming Lives Through Christ's Love</h1>
            <p className="text-section-title text-muted-foreground mb-8">
              Mission Work Among Street Children & Church Planting Across India
            </p>
            <p className="text-large leading-relaxed mb-12">
              From the bustling streets of Bangalore to remote villages across Karnataka, we are committed to sharing the Gospel 
              and demonstrating God's love through practical action—especially to society's most vulnerable.
            </p>
            
            {/* Ministry Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {ministryStats.map((stat, index) => (
                <Card key={index} className="text-center p-4 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-2 text-primary">{stat.icon}</div>
                    <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Church Missions Section */}
      <section id="missions" className="py-16 bg-white text-black">
        <div className="container-wide mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-section-title font-bold mb-6">Mission Work in India</h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              Our primary calling as a Church is to share the Gospel within our own communities. We send out native missionaries, 
              supporting them through prayer and financial aid.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Sending Native Missionaries</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Over the years, we've commissioned hundreds of missionaries to plant churches across India. 
                We continue to stand by them—especially when illness or emergencies strike.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                    <Users className="w-4 h-4" />
                  </Badge>
                  <span>Hundreds of missionaries trained and sent</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                    <DollarSign className="w-4 h-4" />
                  </Badge>
                  <span>Ongoing financial and prayer support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                    <Heart className="w-4 h-4" />
                  </Badge>
                  <span>Emergency assistance when needed</span>
                </div>
              </div>
            </div>
            <Card className="p-6">
              <CardContent className="p-0">
                <h4 className="text-xl font-semibold mb-4">Our Missionary Support</h4>
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    We believe in empowering local leaders who understand their communities' languages, cultures, and needs. 
                    Our missionaries are equipped not just spiritually, but practically for sustainable ministry.
                  </p>
                  <Separator />
                  <p className="text-sm text-muted-foreground">
                    "We send native missionaries because they can reach their own people most effectively, 
                    speaking their language and understanding their culture." - Archbishop Sathiyaraj
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Church Planting Section */}
      <section id="planting" className="py-16">
        <div className="container-wide mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-section-title font-bold mb-6">Church Planting Movement</h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              From humble beginnings with 3 families in 1990, we've grown into a movement planting churches 
              across Karnataka and training leaders for sustainable ministry.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="text-center p-6">
              <CardHeader className="pb-3">
                <Home className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Mother Church</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Agape Bible Church in Bangalore serves as the mother church, 
                  providing training, resources, and oversight for all daughter churches.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader className="pb-3">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Leadership Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We train pastors and leaders in biblical foundations, local ministry, 
                  and practical skills needed for effective church leadership.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader className="pb-3">
                <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Autonomous Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  After mentorship, churches operate autonomously while maintaining 
                  connection to leadership and oversight from the mother church.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Our Church Planting Model</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">1</Badge>
                      <span>Identify and train local leaders with calling and commitment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">2</Badge>
                      <span>Provide mentorship and support during initial phase</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">3</Badge>
                      <span>Establish sustainable community connections and local support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">4</Badge>
                      <span>Gradually transition to autonomous operation with ongoing oversight</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">6</div>
                    <p className="text-sm text-muted-foreground">Churches Directly Overseen</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">10</div>
                    <p className="text-sm text-muted-foreground">Co-Pastors Trained</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">100+</div>
                    <p className="text-sm text-muted-foreground">Leaders Developed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Street Children Ministry Section */}
      <section id="children" className="py-16 bg-white text-black">
        <div className="container-wide mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-section-title font-bold mb-6">Mission Work Among Street Children</h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              In Bangalore alone, there are 70,000 ragpickers (half minors) and 65,000 street children 
              living in abject poverty. We're called to be their hope.
            </p>
          </div>

          {/* Why Children Become Street Kids */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8">Why Children Become Ragpickers or Street Kids</h3>
            
            {/* Add authentic image */}
            <div className="mb-8 relative group ministry-image-container max-w-2xl mx-auto">
              <img 
                src="/children-ministry-authentic.png" 
                alt="Children receiving hope through ministry outreach" 
                className="w-full h-64 object-cover rounded-lg shadow-lg image-hover-zoom"
              />
              <div className="ministry-overlay image-overlay-center opacity-0 group-hover:opacity-100">
                <div className="text-center text-white px-6">
                  <h4 className="text-2xl font-bold mb-2">Hope for the Streets</h4>
                  <p className="text-lg opacity-90">Bringing joy and transformation to vulnerable children</p>
                </div>
              </div>
              <div className="image-badge bg-red-600 text-white">
                <Heart className="h-4 w-4" />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2 italic">
                Bringing joy and hope to children through ministry outreach
              </p>
            </div>
            
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-8">
                <p className="text-lg mb-6 font-semibold text-red-800">
                  It's never by choice. Who would become a street child or ragpicker by choice?
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-red-700">Broken Families</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Violent homes with beatings and abuse</li>
                      <li>• Second marriages where mothers are harmed</li>
                      <li>• Abandonment and rejection by family</li>
                      <li>• Death of parents leaving children orphaned</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-red-700">Survival Pressures</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Forced to work from early age</li>
                      <li>• Malnutrition and lack of basic needs</li>
                      <li>• Peer pressure and gang influence</li>
                      <li>• Girls forced into prostitution for survival</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Society's View vs Reality */}
          <div className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Society's View vs. Their Contribution</h3>
                <Card className="bg-yellow-50 border-yellow-200 mb-6">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-yellow-800 mb-3">How Society Sees Them</h4>
                    <p className="text-muted-foreground">
                      Troublemakers, burdens on society, dirty and unwelcome. 
                      They're avoided, rejected, and criminalized.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-green-800 mb-3">The Hidden Truth</h4>
                    <p className="text-muted-foreground">
                      Up to 25% of everyday items (paper, packaging, plastic goods) 
                      come from materials they collect and recycle. They help reduce 
                      deforestation and keep cities from drowning in waste.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <h4 className="text-xl font-semibold">The Challenges They Face</h4>
                <div className="grid gap-4">
                  {challenges.map((challenge, index) => (
                    <Card key={index} className="p-4">
                      <CardContent className="p-0">
                        <div className="flex items-start gap-3">
                          <div className="text-primary mt-1">{challenge.icon}</div>
                          <div>
                            <h5 className="font-semibold mb-1">{challenge.title}</h5>
                            <p className="text-sm text-muted-foreground">{challenge.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Daily Routine */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8">A Ragpicker's Daily Routine</h3>
            <div className="space-y-4">
              {dailyRoutine.map((item, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="w-16 text-center">{item.time}</Badge>
                        <span className="text-muted-foreground">{item.activity}</span>
                      </div>
                      <Badge variant={item.earnings === "0" ? "secondary" : "default"}>
                        {item.earnings === "0" ? "No Income" : item.earnings}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-6 bg-orange-50 border-orange-200">
              <CardContent className="p-6">
                <p className="text-orange-800 font-semibold">
                  Walking up to 20km daily, barefoot and exhausted, competing with stray animals for scraps, 
                  earning barely enough to survive while facing constant threats and exploitation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Agape Children Centre */}
      <section id="centre" className="py-16">
        <div className="container-wide mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-section-title font-bold mb-6">Agape Children Centre</h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              A safe, loving home where abandoned and unwanted street children can experience Christian love, 
              commitment, and the chance for a transformed life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">What We Provide</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Home className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Safe Housing</h4>
                    <p className="text-muted-foreground">Secure shelter for street children and ragpickers aged 5-12</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Loving Care</h4>
                    <p className="text-muted-foreground">Demonstrating God's love through practical daily care</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Education & Skills</h4>
                    <p className="text-muted-foreground">Basic hygiene, social skills, nutrition, and play</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Community Integration</h4>
                    <p className="text-muted-foreground">Help them develop healthy relationships and social skills</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Add authentic caring ministry image */}
              <div className="mb-6 relative group ministry-image-container">
                <img 
                  src="/caring-ministry.png" 
                  alt="Caring ministry work with children" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg image-hover-zoom"
                />
                <div className="ministry-overlay image-overlay-center opacity-0 group-hover:opacity-100">
                  <div className="text-center text-white px-6">
                    <h4 className="text-2xl font-bold mb-2">Caring Ministry</h4>
                    <p className="text-lg opacity-90">Personal attention and love for every child</p>
                  </div>
                </div>
                <div className="image-badge bg-blue-600 text-white">
                  <Users className="h-4 w-4" />
                </div>
                <p className="text-center text-sm text-muted-foreground mt-2 italic">
                  Personal care and attention for every child
                </p>
              </div>
              
              <Card className="p-6">
                <CardContent className="p-0">
                  <h4 className="text-xl font-semibold mb-4">Our Impact</h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">250+</div>
                      <p className="text-sm text-muted-foreground">Children Helped</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">5-12</div>
                      <p className="text-sm text-muted-foreground">Age Range</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <blockquote className="italic text-muted-foreground">
                    "We aim to provide not just shelter, but hope—showing these precious children 
                    that they are valued, loved, and have a bright future ahead."
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section id="approach" className="py-16 bg-white text-black">
        <div className="container-wide mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-section-title font-bold mb-6">Our Comprehensive Approach</h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              Working with street children requires patience, empathy, and a holistic approach 
              that addresses their physical, emotional, and spiritual needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {ourApproach.map((approach, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="text-primary mb-4">{approach.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{approach.title}</h3>
                  <p className="text-muted-foreground">{approach.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why We're Committed */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold text-center mb-8">Why We're Committed</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Badge variant="secondary" className="mt-1 bg-primary-foreground text-primary">1</Badge>
                    <div>
                      <h4 className="font-semibold mb-2">Equal in God's Eyes</h4>
                      <p className="text-primary-foreground/90">Every child deserves dignity and opportunity, regardless of their circumstances.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Badge variant="secondary" className="mt-1 bg-primary-foreground text-primary">2</Badge>
                    <div>
                      <h4 className="font-semibold mb-2">Transformation</h4>
                      <p className="text-primary-foreground/90">Through education and love, we restore their worth and help them integrate into society.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Badge variant="secondary" className="mt-1 bg-primary-foreground text-primary">3</Badge>
                    <div>
                      <h4 className="font-semibold mb-2">Sharing the Gospel</h4>
                      <p className="text-primary-foreground/90">Bringing hope and spiritual renewal to those who have known only despair.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Badge variant="secondary" className="mt-1 bg-primary-foreground text-primary">4</Badge>
                    <div>
                      <h4 className="font-semibold mb-2">Health & Education</h4>
                      <p className="text-primary-foreground/90">Providing medical care, psychological support, and schooling for a brighter future.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container-wide mx-auto px-6 text-center">
          <h2 className="text-section-title font-bold mb-6">Join Our Mission</h2>
          <p className="text-large mb-8 max-w-2xl mx-auto">
            Through the Agape Children Centre and our nationwide mission efforts, we bring practical care 
            and the love of Christ to India's street children—giving them a real chance at a hopeful, dignified life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#contact">
              <Button size="lg" variant="secondary">
                Partner With Us
              </Button>
            </Link>
            <Link to="/pastor-biography">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Learn About Our Pastor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MinistryPage;