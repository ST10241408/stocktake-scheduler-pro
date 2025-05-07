
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back to Dial a Stocktaker!",
      });
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to show demo credentials
  const loginAs = (role: string) => {
    setEmail(`${role}@example.com`);
    setPassword("password");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Log In</CardTitle>
              <CardDescription>
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </form>
              
              <div className="mt-6">
                <p className="text-sm text-center text-gray-500">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary font-semibold hover:underline">
                    Register
                  </Link>
                </p>
              </div>
              
              {/* Demo login section */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-sm font-semibold text-center mb-3">Demo Logins</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => loginAs("admin")}
                  >
                    Admin
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => loginAs("coordinator")}
                  >
                    Coordinator
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => loginAs("scanner")}
                  >
                    Scanner
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => loginAs("client")}
                  >
                    Client
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => loginAs("supervisor")}
                  >
                    Supervisor
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => loginAs("receptionist")}
                  >
                    Receptionist
                  </Button>
                </div>
                <p className="text-xs text-center text-gray-500 mt-2">
                  Use any of these emails with password "password"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <PublicFooter />
    </div>
  );
};

export default LoginPage;
