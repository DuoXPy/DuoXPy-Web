import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, Rocket, Shield, User2Icon, Zap } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const spotlightRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      spotlightRefs.current.forEach(spotlight => {
        const rect = spotlight.getBoundingClientRect();
        const offset = window.innerHeight - rect.top;
        const scale = Math.min(1.2, Math.max(0.8, offset / window.innerHeight * 1.5));
        spotlight.style.transform = `translate(-50%, -50%) scale(${scale})`;
        spotlight.style.opacity = Math.min(1, offset / window.innerHeight * 1.5);
      });
    };

    const handleMouseMove = (e) => {
      spotlightRefs.current.forEach(spotlight => {
        const rect = spotlight.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spotlight.style.background = `radial-gradient(
          600px at ${x}px ${y}px,
          rgba(29, 78, 216, 0.15),
          transparent 80%
        )`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Spotlight */}
      <div className="fixed inset-0 pointer-events-none z-[49]">
        <div 
          ref={el => spotlightRefs.current[0] = el}
          className="absolute w-[800px] h-[800px] rounded-full blur-[100px] opacity-0 transition-all duration-300"
          style={{
            background: 'radial-gradient(600px at 50% 50%, rgba(29, 78, 216, 0.15), transparent 80%)'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-white hover:opacity-80 transition-opacity">
              <Link to="/">DuoXPy</Link>
            </div>
            <div className="flex gap-4 items-center">
              <Link to="/tos" className="text-white/70 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/changelog" className="text-white/70 hover:text-white transition-colors">Changelog</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 bg-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center space-y-8 animate-fade-down max-w-5xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full mb-8 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <span className="text-white/90 text-sm font-medium">New: v3.9.5 NFKD Tunned 2 Just Dropped ✨</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white relative z-10 hover:scale-[1.02] transition-transform duration-500">
              The easiest way to
              <br />
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white animate-pulse">
                dominate everyone in your leagues.
              </span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-2xl mx-auto animate-fade-up delay-200">
              One platform for accelerating your language learning journey.
              Master new languages in seconds, not months.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Button 
                className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                onClick={() => window.open('https://discord.gg/Ysq7SFGks5', '_blank')}
              >
                Get Started
              </Button>
              <Button
                className="w-full sm:w-auto px-8 py-4 bg-[#5865F2] text-white rounded-full font-medium hover:bg-[#5865F2]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#5865F2]/20 group"
                onClick={() => window.open('https://discord.gg/Ysq7SFGks5', '_blank')}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" viewBox="0 -28.5 256 256" fill="currentColor">
                    <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"/>
                  </svg>
                  Join Discord
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-24 bg-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 hover:scale-[1.02] transition-transform duration-500">
              Why Choose DuoXPy?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Experience the most advanced language learning assistance platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-white" />,
                title: "Lightning Fast",
                description: "Get instantly pushed to the top of your league, and get streaks like its nothing."
              },
              {
                icon: <Shield className="w-6 h-6 text-white" />,
                title: "Secure & Private",
                description: "Your learning data is encrypted and protected at all times."
              },
              {
                icon: <Rocket className="w-6 h-6 text-white" />,
                title: "Rapid Progress",
                description: "Achieve your language goals in record time with smart assistance."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="relative py-24 bg-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Pricing Plans</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">Choose the plan that fits your needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Free",
                price: "$0.00",
                features: ["Limited access","Command limits"],
                buttonText: "Get Started",
                link: "https://discord.gg/Ysq7SFGks5"
              },
              {
                title: "1 Month",
                price: "$2.00",
                features: ["Full access","No limits"],
                buttonText: "Subscribe",
                link: "https://duoxpy.mysellauth.com/product/1-month"
              },
              {
                title: "3 Months",
                price: "$5.00",
                features: ["Full access","No limits"],
                buttonText: "Subscribe",
                link: "https://duoxpy.mysellauth.com/product/3-months"
              },
              {
                title: "6 Months",
                price: "$10.00",
                features: ["Full access","No limits"],
                buttonText: "Subscribe",
                link: "https://duoxpy.mysellauth.com/product/6-months"
              },
              {
                title: "12 Months",
                price: "$15.00",
                features: ["Full access","No limits"],
                buttonText: "Subscribe",
                link: "https://duoxpy.mysellauth.com/product/12-months"
              },
              {
                title: "Lifetime",
                price: "$20.00",
                features: ["Full access","No limits"],
                buttonText: "Subscribe",
                link: "https://duoxpy.mysellauth.com/product/lifetime",
                bestValue: true
              }
            ].map((plan, index) => (
              <div key={index} className={`p-6 rounded-2xl border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 relative ${plan.bestValue ? "border-2 border-white" : ""}`}>
                {plan.bestValue && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-sm font-medium border border-white/20">
                    Best Value
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white mb-4">{plan.title}</h3>
                <div className="text-3xl font-bold text-white mb-6">{plan.price}</div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-white/60">• {feature}</li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-white text-black hover:bg-white/90"
                  onClick={() => window.open(plan.link, "_blank")}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative min-h-[calc(100vh-300px)] py-24 flex flex-col justify-center bg-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 animate-fade-up hover:scale-[1.02] transition-transform duration-500">
              Ready to Transform Your Language Learning?
            </h2>
            <button 
              className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
              onClick={() => window.open("https://discord.gg/Ysq7SFGks5", "_blank")}
            >
              Get Started Now
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
