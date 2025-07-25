import {
  NavigationMenu,
  // NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Link } from 'react-router-dom';



const Navbar = () => {
  const links = (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink asChild><Link to={'/'}> Books </Link></NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild><Link to={'/addBook'}> Add book </Link></NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild><Link to={'/borrowSummary'}> Borrow Summary </Link></NavigationMenuLink>
      </NavigationMenuItem>
    </>
  )
  return (
    <div className='bg-red-100 py-2 '>
      <NavigationMenu>
        <NavigationMenuList>
          {links}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;