import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import dhanushImage from '../../../assets/images/dhanush.jpeg';
import bharaniImage from '../../../assets/images/bhara.jpeg';
import samsuddinImage from '../../../assets/images/Samsuddin.jpg';
import mathishImage from '../../../assets/images/mathish.jpeg';
import akileshImage from '../../../assets/images/akhilesh.webp';
const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
  {
    id: 4,
    name: "Akilesh",
    position: "CEO & Founder",
    department: "Leadership",
    image: akileshImage,
    imageAlt: "Professional headshot of CEO and Founder",
    bio: `Akilesh is the visionary CEO and Founder, driving strategic growth and innovation for the organization.\n\nHis expertise in market insights and business expansion has shaped the company's long-term success.`,
    expertise: [
      "Visionary Leadership",
      "Product Innovation",
      "Market Disruption",
      "Team Empowerment"
    ],
    achievements: ["Founder’s Excellence Award", "Business Leader Award"],
    social: {
      linkedin: "https://linkedin.com",
      dribbble: "https://dribbble.com"
    }
  },
  {
    id: 3,
    name: "Dhanush Ram",
    position: "CSO / Investing Founder",
    department: "Strategy",
    image: dhanushImage,
    imageAlt: "Professional headshot of CSO",
    bio: `Dhanush Ram leads the strategy division with deep analytical thinking and long-term vision.\n\nHe focuses on investment planning, strategic decisions, and scaling opportunities that help the organization grow sustainably.`,
    expertise: [
      "Strategic Leadership",
      "Decision Making",
      "Growth Planning",
      "Business Scaling"
    ],
    achievements: ["Tech Innovator Award", "Strategic Excellence Award"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  { 
    id: 10,
    name: "Mathish",
    position: "CRO / Client Relationships",
    department: "Client & Partnership Management",
    image: mathishImage,
    imageAlt: "Professional headshot of CRO",
    bio: `Mathish is the Chief Relationship Officer specializing in strong client partnerships and business collaborations.\n\nHe ensures long-term customer satisfaction and builds meaningful relationships that drive business growth.`,
    expertise: [
      "Client Acquisition",
      "Partnership Building",
      "Relationship Management",
      "Customer Engagement"
    ],
    achievements: ["Top Client Strategist Award", "Relationship Excellence Recognition"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    id: 1,
    name: "Bharani Nagaraj",
    position: "RJ, Voice Over Artist & News Reader",
    department: "Media & Communications",
    image: bharaniImage,
    imageAlt: "Professional headshot of individual in media communication profile",
    bio: `Bharani Nagaraj is a dynamic RJ, skilled voice-over artist, and professional news reader.\n\nWith a strong command over communication and presentation, Bharani brings clarity, confidence, and storytelling excellence to every project.`,
    expertise: ["Anchoring & Hosting", "Voice Over", "News Reading", "Public Communication"],
    achievements: ["Top RJ Recognition", "Professional Voice Artist Award"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    id: 2,
    name: "Samsuddin",
    position: "Camera Man & Video Editor",
    department: "Media Production",
    image: samsuddinImage,
    imageAlt: "Professional headshot of cameraman and video editor",
    bio: `Samsuddin is an expert cameraman and video editor known for crafting visually appealing content.\n\nHis technical expertise ensures every frame tells a story with clarity, creativity, and precision.`,
    expertise: ["Videography", "Video Editing", "Cinematography", "Post Production"],
    achievements: ["Creative Video Editor Award", "Short Film Production Recognition"],
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  }
];



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
          className="text-center mb-10">

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet Our <span className="text-primary">Expert Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Industry leaders, innovators, and visionaries working together to deliver
            exceptional results and drive your success forward.
          </p>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {departments?.map((dept) =>
              <button
                key={dept}
                onClick={() => setActiveFilter(dept)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === dept ?
                    'bg-primary text-primary-foreground shadow-professional' :
                    'bg-card text-muted-foreground hover:text-primary hover:bg-muted'}`
                }>

                {dept}
              </button>
            )}
          </div>
        </motion.div>

        {/* Large profile layout: stacked large cards, image left on desktop */}
        <div className="flex flex-col gap-8">
          <AnimatePresence>
            {filteredMembers?.map((member, index) =>
              <motion.div
                key={member?.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group cursor-pointer"
                onClick={() => setSelectedMember(member)}>

                <div className="bg-card rounded-3xl p-8 shadow-professional hover:shadow-professional-xl transition-all duration-300 border border-border">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Image / Media */}
                    <div className="w-full md:w-1/3 flex-shrink-0">
                      <div className="w-full rounded-2xl overflow-hidden ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
                        <Image
                          src={member?.image}
                          alt={member?.imageAlt}
                          className="w-full h-64 md:h-80 object-cover"
                        />
                      </div>
                      <div className="mt-4 md:mt-6 flex items-center gap-3">
                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                          {member?.department}
                        </div>
                        <div className="text-sm text-muted-foreground">{member?.position}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-2/3">
                      <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                        {member?.name}
                      </h3>

                      <p className="text-muted-foreground mb-4 max-w-3xl leading-relaxed whitespace-pre-line">
                        {member?.bio.split('\n')[0]}{/* show first paragraph */}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {member?.expertise?.map((skill, idx) =>
                          <span
                            key={idx}
                            className="bg-muted text-muted-foreground px-3 py-1 rounded-md text-sm">
                            {skill}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedMember(member); }}
                          className="px-5 py-3 bg-gradient-to-r from-[#e57b46] to-[#B9AEDF] text-white rounded-lg font-medium shadow-md"
                        >
                          View Profile
                        </button>

                        <div className="flex items-center space-x-3">
                          {Object.entries(member?.social)?.map(([platform, url]) =>
                            <a
                              key={platform}
                              href={url}
                              onClick={(e) => e.stopPropagation()}
                              className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                              aria-label={platform}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Icon name={platform === 'linkedin' ? 'Linkedin' : platform === 'twitter' ? 'Twitter' : platform === 'github' ? 'Github' : 'Globe'} size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Team Member Modal — larger layout */}
        <AnimatePresence>
          {selectedMember &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedMember(null)}>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-card rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-professional-xl"
                onClick={(e) => e?.stopPropagation()}>

                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="w-full lg:w-1/3 flex-shrink-0">
                    <div className="w-full rounded-2xl overflow-hidden">
                      <Image src={selectedMember?.image} alt={selectedMember?.imageAlt} className="w-full h-96 object-cover" />
                    </div>
                    <div className="mt-4">
                      <div className="text-2xl font-bold text-foreground">{selectedMember?.name}</div>
                      <div className="text-primary font-medium">{selectedMember?.position}</div>
                      <div className="mt-2 bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm inline-block">
                        {selectedMember?.department}
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-2/3">
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
                            <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
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
                        <div className="flex flex-wrap gap-3">
                          {Object.entries(selectedMember?.social)?.map(([platform, url]) =>
                            <a
                              key={platform}
                              href={url}
                              className="flex items-center space-x-2 bg-muted hover:bg-primary text-muted-foreground hover:text-primary-foreground px-4 py-2 rounded-lg transition-all duration-200"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Icon name={platform === 'linkedin' ? 'Linkedin' : platform === 'twitter' ? 'Twitter' : platform === 'github' ? 'Github' : 'Globe'} size={16} />
                              <span className="capitalize">{platform}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="px-5 py-2 bg-transparent text-white rounded-lg border border-border hover:bg-[#0f0f14]">
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TeamSection;