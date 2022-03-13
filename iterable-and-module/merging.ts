interface Cat {}
interface Dog {}
interface Animal {}

interface Cloner {
  clone(animal: Animal): Animal;
}

interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}

// is equal with
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;

  clone(animal: Animal): Animal;
}
