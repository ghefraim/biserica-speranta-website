
const departmentTitles = document.querySelectorAll(".div-block-2");
departmentTitles.forEach(d => {
    d.addEventListener("click", () => {
        // highlight the selected button:
        if (!d.classList.contains("selected-button")) {
            d.classList.add("selected-button");
        }
        else {
            d.classList.remove("selected-button");
        }

        departmentTitles.forEach(dep => {
            if(dep != d){
                dep.classList.remove("selected-button");
            }
        });

        // make corresponding div appear:
        let j;
        for(j=0; j<departmentTitles.length;j++)
        {
            if(d === departmentTitles[j])
            {
                break;
            }
        }

        let query = `.paragraph-block-${j+1}`;
        const paragraphBlock = document.querySelector(query);

        const paragraphBlocks = document.querySelectorAll(".text-block-7");
        paragraphBlocks.forEach(p => {
            // if(p.style.display == "block" && p != paragraphBlock)
            // {
            //     p.style.display = "none";
            // }
            if(p.classList.contains("active") && p != paragraphBlock)
            {
                p.classList.remove("active");
            }
        });

        if (!paragraphBlock.classList.contains("active")){
            paragraphBlock.classList.add("active");
        }
        else {
            paragraphBlock.classList.remove("active");
        }
        // if(paragraphBlock.style.display == "none")
        // {
        //     paragraphBlock.style.display = "block";
        // }
        // else //if(paragraphBlock.style.display == "block")
        // {
        //     paragraphBlock.style.display = "none";
        // }
    });
});



// for external links
document.addEventListener("DOMContentLoaded", function() {
    // Check for the URL parameter on page load
    const urlParams = new URLSearchParams(window.location.search);
    const departament = urlParams.get("departament");

    document.getElementById(departament).style.display = "block";
    
});


function expandSectoare() {
    const content = document.querySelector(".sectoare-content");
    if(!content.classList.contains("expand")) {
        content.classList.add("expand");
    } 
    else {
        content.classList.remove("expand");
    }
}