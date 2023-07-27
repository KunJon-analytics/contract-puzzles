const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game4", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    const [sender] = await ethers.getSigners();

    return { game, sender };
  }
  it("should be a winner", async function () {
    const { game, sender } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.write(sender.address);

    await game.win(sender.address);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
