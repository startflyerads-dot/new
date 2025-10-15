import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    position: "Chief Executive Officer",
    department: "Leadership",
    image: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    imageAlt: "Professional headshot of Asian woman with shoulder-length black hair in navy blazer smiling confidently",
    bio: `Sarah leads ServiceHub Pro with over 15 years of experience in transforming traditional service industries through innovative technology solutions.\n\nHer vision has guided the company from a startup to an industry leader, focusing on client-centric approaches and measurable results.`,
    expertise: ["Strategic Leadership", "Digital Transformation", "Client Relations", "Innovation Management"],
    achievements: ["Forbes 40 Under 40", "Tech Leader of the Year 2023", "Harvard Business Review Contributor"],
    social: {
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen"
    }
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    position: "Chief Technology Officer",
    department: "Technology",
    image: "https://images.unsplash.com/photo-1636955031709-e3a4a671ede8",
    imageAlt: "Professional headshot of Hispanic man with short dark hair and beard in dark suit jacket",
    bio: `Marcus drives our technological innovation with expertise in AI, machine learning, and scalable system architecture.\n\nHe has led the development of our proprietary service delivery platform that has revolutionized client experiences.`,
    expertise: ["AI & Machine Learning", "System Architecture", "Product Development", "Technical Strategy"],
    achievements: ["MIT Technology Review Innovator", "Patent Holder (12 patents)", "IEEE Fellow"],
    social: {
      linkedin: "https://linkedin.com/in/marcusrodriguez",
      github: "https://github.com/marcusrodriguez"
    }
  },
  {
    id: 3,
    name: "Emily Watson",
    position: "Head of Client Success",
    department: "Operations",
    image: "https://images.unsplash.com/photo-1624484631620-9e53e4aed980",
    imageAlt: "Professional headshot of blonde woman with wavy hair in light blue blouse smiling warmly",
    bio: `Emily ensures every client achieves exceptional results through our services, maintaining our industry-leading 98% satisfaction rate.\n\nHer client-first approach has established long-term partnerships with Fortune 500 companies worldwide.`,
    expertise: ["Client Relations", "Project Management", "Quality Assurance", "Team Leadership"],
    achievements: ["Client Success Leader Award", "PMP Certification", "Customer Experience Excellence"],
    social: {
      linkedin: "https://linkedin.com/in/emilywatson",
      twitter: "https://twitter.com/emilywatson"
    }
  },
  {
    id: 4,
    name: "David Kim",
    position: "Creative Director",
    department: "Design",
    image: "https://images.unsplash.com/photo-1638908219964-b94fd11fefcf",
    imageAlt: "Professional headshot of Asian man with styled black hair in charcoal suit with confident expression",
    bio: `David leads our design philosophy, creating visually stunning and functionally superior experiences that set industry standards.\n\nHis work has been recognized internationally for innovation in user experience and visual design.`,
    expertise: ["UX/UI Design", "Brand Strategy", "Creative Leadership", "Design Systems"],
    achievements: ["Design Excellence Award", "Red Dot Design Winner", "Adobe Creative Resident"],
    social: {
      linkedin: "https://linkedin.com/in/davidkim",
      dribbble: "https://dribbble.com/davidkim"
    }
  },
  {
    id: 5,
    name: "Lisa Thompson",
    position: "Head of Strategy",
    department: "Strategy",
    image: "https://images.unsplash.com/photo-1581341038810-5a2fa5b18f6e",
    imageAlt: "Professional headshot of African American woman with natural hair in burgundy blazer with warm smile",
    bio: `Lisa develops strategic initiatives that drive sustainable growth and market expansion for ServiceHub Pro.\n\nHer analytical approach and market insights have guided successful launches in 15 international markets.`,
    expertise: ["Strategic Planning", "Market Analysis", "Business Development", "International Expansion"],
    achievements: ["Strategy Excellence Award", "MBA Harvard Business School", "McKinsey Alumni"],
    social: {
      linkedin: "https://linkedin.com/in/lisathompson",
      twitter: "https://twitter.com/lisathompson"
    }
  },
  {
    id: 6,
    name: "James Wilson",
    position: "Head of Innovation",
    department: "Innovation",
    image: "https://images.unsplash.com/photo-1714974528889-d51109fb6ae9",
    imageAlt: "Professional headshot of Caucasian man with brown hair and beard in navy blue suit with friendly smile",
    bio: `James spearheads our innovation lab, exploring emerging technologies and methodologies that shape the future of professional services.\n\nHis research has led to breakthrough solutions that have transformed entire industry sectors.`,
    expertise: ["Innovation Strategy", "Emerging Technologies", "R&D Leadership", "Future Planning"],
    achievements: ["Innovation Leader Award", "PhD in Computer Science", "TEDx Speaker"],
    social: {
      linkedin: "https://linkedin.com/in/jameswilson",
      twitter: "https://twitter.com/jameswilson"
    }
  }];


  const departments = ["All", "Leadership", "Technology", "Operations", "Design", "Strategy", "Innovation"];
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredMembers = activeFilter === "All" ?
  teamMembers :
  teamMembers?.filter((member) => member?.department === activeFilter);

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet Our <span className="text-primary">Expert Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Industry leaders, innovators, and visionaries working together to deliver 
            exceptional results and drive your success forward.
          </p>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {departments?.map((dept) =>
            <button
              key={dept}
              onClick={() => setActiveFilter(dept)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeFilter === dept ?
              'bg-primary text-primary-foreground shadow-professional' :
              'bg-card text-muted-foreground hover:text-primary hover:bg-muted'}`
              }>

                {dept}
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredMembers?.map((member, index) =>
            <motion.div
              key={member?.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedMember(member)}>

                <div className="bg-card rounded-2xl p-6 shadow-professional hover:shadow-professional-xl transition-all duration-300 border border-border group-hover:border-primary/20">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                      <Image
                      src={member?.image}
                      alt={member?.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />

                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {member?.department}
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                      {member?.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">{member?.position}</p>
                    
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {member?.expertise?.slice(0, 2)?.map((skill, idx) =>
                    <span
                      key={idx}
                      className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs">

                          {skill}
                        </span>
                    )}
                    </div>

                    <div className="flex justify-center space-x-3">
                      {Object.entries(member?.social)?.map(([platform, url]) =>
                    <a
                      key={platform}
                      href={url}
                      className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      onClick={(e) => e?.stopPropagation()}>

                          <Icon name={platform === 'linkedin' ? 'Linkedin' : platform === 'twitter' ? 'Twitter' : platform === 'github' ? 'Github' : 'Globe'} size={16} />
                        </a>
                    )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Team Member Modal */}
        <AnimatePresence>
          {selectedMember &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}>

              <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-card rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-professional-xl"
              onClick={(e) => e?.stopPropagation()}>

                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/20">
                      <Image
                      src={selectedMember?.image}
                      alt={selectedMember?.imageAlt}
                      className="w-full h-full object-cover" />

                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{selectedMember?.name}</h3>
                      <p className="text-primary font-medium">{selectedMember?.position}</p>
                      <span className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-sm">
                        {selectedMember?.department}
                      </span>
                    </div>
                  </div>
                  <button
                  onClick={() => setSelectedMember(null)}
                  className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-all duration-200">

                    <Icon name="X" size={16} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">About</h4>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {selectedMember?.bio}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember?.expertise?.map((skill, idx) =>
                    <span
                      key={idx}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">

                          {skill}
                        </span>
                    )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Achievements</h4>
                    <ul className="space-y-2">
                      {selectedMember?.achievements?.map((achievement, idx) =>
                    <li key={idx} className="flex items-center space-x-2 text-muted-foreground">
                          <Icon name="Award" size={16} className="text-primary" />
                          <span>{achievement}</span>
                        </li>
                    )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Connect</h4>
                    <div className="flex space-x-3">
                      {Object.entries(selectedMember?.social)?.map(([platform, url]) =>
                    <a
                      key={platform}
                      href={url}
                      className="flex items-center space-x-2 bg-muted hover:bg-primary text-muted-foreground hover:text-primary-foreground px-4 py-2 rounded-lg transition-all duration-200">

                          <Icon name={platform === 'linkedin' ? 'Linkedin' : platform === 'twitter' ? 'Twitter' : platform === 'github' ? 'Github' : 'Globe'} size={16} />
                          <span className="capitalize">{platform}</span>
                        </a>
                    )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </section>);

};

export default TeamSection;