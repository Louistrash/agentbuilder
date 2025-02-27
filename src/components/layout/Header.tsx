
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, Settings, LogOut, ChevronDown, Bot, Shield, Home, Sun, Moon, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { supabase } from '@/integrations/supabase/client';
import { TokenDisplay } from '@/components/layout/TokenDisplay';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = true; // TODO: Replace with actual admin check

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const menuItems = [
    { label: 'Home', path: '/', icon: <Home className="h-4 w-4 mr-2" /> },
    { label: 'Agents', path: '/agent-builder', icon: <Bot className="h-4 w-4 mr-2" /> },
    // Conditionally show admin link for admin users
    ...(isAdmin ? [{ label: 'Admin', path: '/admin', icon: <Shield className="h-4 w-4 mr-2" /> }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0D1117]/85 backdrop-blur-md border-b border-[#30363D]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Bot className="h-8 w-8 text-[#FEC6A1]" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#FEC6A1] to-[#FFC6FF] bg-clip-text text-transparent">SkyBot</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium flex items-center transition-colors ${
                  location.pathname === item.path
                    ? 'text-[#FEC6A1]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Navigation (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Token Display */}
            <TokenDisplay />
            
            {/* Theme Toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-9 w-9 border border-[#30363D]">
                      <AvatarImage src={user.avatar_url || ''} alt={user.full_name || 'User'} />
                      <AvatarFallback className="bg-[#161B22] text-[#FEC6A1]">
                        {(user.full_name || 'User').substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#161B22] border border-[#30363D] text-white" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.full_name || 'User'}</p>
                      <p className="text-sm text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-[#30363D]" />
                  <DropdownMenuItem 
                    className="cursor-pointer text-white hover:bg-[#30363D] focus:bg-[#30363D]"
                    onClick={() => navigate('/dashboard')}
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer text-white hover:bg-[#30363D] focus:bg-[#30363D]"
                    onClick={() => navigate('/profile')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer text-white hover:bg-[#30363D] focus:bg-[#30363D]"
                    onClick={() => navigate('/settings')}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#30363D]" />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-400 hover:bg-red-900/20 focus:bg-red-900/20"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-x-2">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                  onClick={() => navigate('/auth?mode=signin')}
                >
                  Log in
                </Button>
                <Button
                  className="bg-[#FEC6A1] hover:bg-[#FEC6A1]/90 text-black font-medium"
                  onClick={() => navigate('/auth?mode=signup')}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            {user && <TokenDisplay />}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#161B22] border-b border-[#30363D]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-[#30363D] text-white'
                    : 'text-gray-300 hover:bg-[#30363D] hover:text-white'
                }`}
                onClick={closeMenu}
              >
                <div className="flex items-center">
                  {item.icon}
                  {item.label}
                </div>
              </Link>
            ))}
            {user ? (
              <>
                <hr className="border-[#30363D] my-2" />
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-[#30363D] hover:text-white"
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </div>
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-[#30363D] hover:text-white"
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </div>
                </Link>
                <button
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-900/20"
                  onClick={() => {
                    handleSignOut();
                    closeMenu();
                  }}
                >
                  <div className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </div>
                </button>
              </>
            ) : (
              <>
                <hr className="border-[#30363D] my-2" />
                <Link
                  to="/auth?mode=signin"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-[#30363D] hover:text-white"
                  onClick={closeMenu}
                >
                  Log in
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-[#FEC6A1]/10 text-[#FEC6A1] hover:bg-[#FEC6A1]/20"
                  onClick={closeMenu}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
