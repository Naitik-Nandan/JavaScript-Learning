class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;
    constructor(brand, model) {
        this.#brand = brand;
        this.#model = model;
    }

    displayInfo() {
        console.log(`${this.#brand} ${this.#model} , Speed: ${this.speed} , Trunk : ${this.isTrunkOpen === true ? 'Open' : 'Close'}`)
    }

    go() {
        if (this.speed >= 0 && this.speed <= 195 && this.isTrunkOpen === false)
            this.speed += 5;
    }
    brake() {
        if (this.speed >= 5 && this.speed <= 200)
            this.speed -= 5;
    }
    openTrunk() {
        if (this.speed === 0)
            this.isTrunkOpen = true;
    }
    closeTrunk() {
        this.isTrunkOpen = false;
    }

};

const car1 = new Car('Toyota', 'Corrola');
const car2 = new Car('Tesla', 'Model 3');
car1.go();
car1.go();
car2.go();
car2.brake();
car2.openTrunk();
car2.closeTrunk();
car1.displayInfo();
car2.displayInfo();

class RaceCar extends Car {
    #brand = 'McLaren';
    #model = 'F1';
    acceleration;
    go() {
        if (this.speed >= 0 && this.speed <= 295 && this.isTrunkOpen === false)
            this.speed += this.acceleration;
    }
    brake() {
        if (this.speed >= 5 && this.speed <= 300)
            this.speed -= this.acceleration;
    }
    openTrunk() {
        this.isTrunkOpen = false;
    }
    closeTrunk() {
        this.isTrunkOpen = false;
    }
    constructor(brand, model , acceleration) {
        super(brand , model);
        this.acceleration = acceleration
    }
    displayInfo() {
       console.log(`${this.#brand} ${this.#model} , Speed: ${this.speed} , Acceleration: ${this.acceleration}`);
    }
};

const raceCar1 = new RaceCar('McLaren' , 'F1' , 20);
raceCar1.go();
raceCar1.go();
raceCar1.displayInfo();