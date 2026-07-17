interface StarsProp {
    value: number
}

const Stars = ({value}: StarsProp) => {
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
            <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title justify-center" >Stars: {value} </h2>

        </div>
        </div>
    )
}

export default Stars