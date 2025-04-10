import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadCrumbs = () => {
    const pathname = usePathname();
    //console.log(location);
    let currentLink = '';
    
    const crumbs = pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
        currentLink += `/${crumb}`;
        return (
            <div className="after:content-['>'] after:ml-2 after:last:hidden text-xl last:text-gray-400 crumb" key={crumb}>
                <Link href={currentLink}>{crumb}</Link>
            </div>
        )
    })
    //console.log(crumbs); 
    return (
        <div className="flex space-x-2 breadcrumbs">
            {crumbs}
        </div>
    )
}

export default BreadCrumbs;