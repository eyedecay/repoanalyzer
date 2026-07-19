interface LanguageProp {
    language: string
}

const Language = ({language}: LanguageProp) => {
    const iconName = language.toLowerCase().replace("#", "sharp").replace("++", "plusplus".replace(" ", ""))

    const imageUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`;
    return (
        <div className="card bg-base-100 w-48 shadow-sm">
        <div className="hover-3d">
            {/* content */}
            <figure className="h-28 max-w-100 rounded-2xl">
                <img src= {imageUrl} alt="3D card" className = "w-28 h-28 object-contain" />
            </figure>
            {/* 8 empty divs needed for the 3D effect */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className="card-body">
            <h2 className="card-title justify-center" >{language} </h2>

        </div>
        </div>
    )
}


export default Language