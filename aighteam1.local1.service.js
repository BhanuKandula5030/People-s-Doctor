class aighteam1Local1Service {
  aighteam1_local1_data = {
    doctors: [
      {
        name: "Shivani V. Tripathi",
        rating: 4,
        specialites: "skin, hair",
      },
      {
        name: "Alan C. Braverman",
        rating: 5,
        specialites: "heart and blood vessels",
      },
      {
        name: "firstRandom lastRandom",
        rating: 5,
        specialites: "testDisease1, testDisease2",
      },
    ],
  };
  
  constructor() {
    this.aighteam1Local1Data = this.aighteam1_local1_data;
  }

  get_data() {
    return this.aighteam1Local1Data;
  }
}


module.exports = aighteam1Local1Service;
