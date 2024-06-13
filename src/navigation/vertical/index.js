/*

Array of object

Top level object can be:
1. Header
2. Group (Group can have navItems as children)
3. navItem

* Supported Options

/--- Header ---/

header

/--- nav Grp ---/

title
icon (if it's on top level)
tag
tagVariant
children

/--- nav Item ---/

icon (if it's on top level)
title
route: [route_obj/route_name] (I have to resolve name somehow from the route obj)
tag
tagVariant

*/
import dashboard from './dashboard'
import apps from './apps'
import others from './others'
import memberCredit from './membercredit'
import setting from './setting'

function FilterNav(tmpMenu)
{
    let tmpFilterMenu = [];
    let am_rank = localStorage.getItem("amRank");
    let pageAuthen = localStorage.getItem("pageAuthen");
    if (am_rank==4) 
    {
      return tmpMenu;
    }
    else
    {
        for (let index = 0; index < tmpMenu.length; index++) 
        {
            const element = tmpMenu[index];            
            if(element['header'])
            {
                let foundSubMenu = false;
                if(element['submenu'])
                {
                    for (let index2 = 0; index2 < element['submenu'].length; index2++) 
                    {
                        const element2 = element['submenu'][index2];                        
                        if (pageAuthen) {   
                            if(pageAuthen.indexOf(element2)>-1)
                            {
                                foundSubMenu=true;
                                break;
                            }
                        }  
                    }
                }

                if(foundSubMenu)
                {
                    tmpFilterMenu.push(element);
                }
                
            }
            else if(element['children'])
            {   
                
                let tmpListChild=[];
                for (let index2 = 0; index2 < element['children'].length; index2++) 
                {
                    const element2 = element['children'][index2];                   
                    if (pageAuthen) {                        
                        if(pageAuthen.indexOf(element2['route'])>-1)
                        {
                            tmpListChild.push(element2);
                        }
                    }                      
                }

                tmpFilterMenu.push(
                    {
                        title : element['title'],
                        icon : element['icon'],
                        children : tmpListChild,
                    }
                );
            }
            else
            {                
                if (pageAuthen) {           
                    
                    if(pageAuthen.indexOf(element['route'])>-1)
                    {
                        tmpFilterMenu.push(
                            {
                                title : element['title'],
                                route : element['route'],                        
                            }
                        );
                    }
                }  
                
            }
        }
    }
    
    return tmpFilterMenu;
}

const fmemberCredit = FilterNav(memberCredit);
const fdashboard = FilterNav(dashboard);
const fapps = FilterNav(apps);
const fsetting = FilterNav(setting);
const fothers = FilterNav(others);

// Array of sections
export default [...fdashboard,...fapps,...fmemberCredit, ...fsetting, ...fothers]
