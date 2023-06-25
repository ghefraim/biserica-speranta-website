
const departmentTitles = document.querySelectorAll(".div-block-2");
departmentTitles.forEach(d => {
    d.addEventListener("click", () => {
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
            if(p.style.display == "block" && p != paragraphBlock)
            {
                p.style.display = "none";
            }
        });

        if(paragraphBlock.style.display == "none")
        {
            paragraphBlock.style.display = "block";
        }
        else //if(paragraphBlock.style.display == "flex")
        {
            paragraphBlock.style.display = "none";
        }
    });
});
