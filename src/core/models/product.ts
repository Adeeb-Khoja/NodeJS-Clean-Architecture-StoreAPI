export class Product {
    constructor(
        public id : string,
        public name : string,
        public brand: string,
        public isFeatured: boolean,
        public price: number,
        public rating: number,
        public createdAt: Date
    ){}

    validateName = () => this.name.length > 0
    
    validatePrice = () =>  this.price >= 0

    feature = () => this.isFeatured = true

    unfeature = () => this.isFeatured = false

    update = (product:IUpdateProduct) => {
        this.name = product.name ?? this.name
        this.brand = product.brand ?? this.brand
        this.isFeatured = product.isFeatured ?? this.isFeatured
        this.price = product.price ?? this.price
        this.rating = product.rating ?? this.rating
    }

}

interface IUpdateProduct {
    name?:string
    brand?:string
    isFeatured?:boolean
    price?:number
    rating?:number
}
