import { SignedIn, SignedOut } from "@clerk/nextjs";
import NavLink from "./nav-link";
import { FileText } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
export default function Header() {
  return (
    <nav className="container mx-auto flex items-center justify-between px-2 py-4 lg:px-8">
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex shrink-0 items-center gap-1 lg:gap-2">
          <FileText className="h-5 h-8 w-5 transform text-gray-900 transition duration-200 ease-in-out hover:rotate-12 lg:w-8" />
          <span className="font-extrabold text-gray-900 lg:text-xl">
            Sommaire
          </span>
        </NavLink>
      </div>
      <div className="flex gap-4 lg:items-center lg:justify-center lg:gap-12">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn><NavLink href="/dashboard">Your Summaries</NavLink>
          </SignedIn>
      </div>
      <div className="flex lg:flex-1 lg:justify-end">
        <SignedIn>
          <div className="flex items-center gap-2">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <div>Pro</div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>
       
          <SignedOut>
            <NavLink href="/sign-in">Sign in</NavLink>
          </SignedOut>
      
      </div>
    </nav>
  );
}
