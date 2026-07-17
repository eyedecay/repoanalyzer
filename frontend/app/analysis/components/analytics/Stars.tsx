interface StarsProp {
    stars: number
}

const Stars = ({stars}: StarsProp) => {
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
        <div className="hover-3d">
            {/* content */}
            <figure className="max-w-100 rounded-2xl">
                <img src="https://img.daisyui.com/images/stock/creditcard.webp" alt="3D card" />
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
            <h2 className="card-title justify-center" >Stars: {stars} </h2>

        </div>
        </div>
    )
}

export default Stars