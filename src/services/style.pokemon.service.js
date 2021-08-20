import bugIcon from "../assets/types/bug.svg";
import darkIcon from "../assets/types/dark.svg";
import dragonIcon from "../assets/types/dragon.svg";
import electricIcon from "../assets/types/electric.svg";
import fairyIcon from "../assets/types/fairy.svg";
import fightingIcon from "../assets/types/fighting.svg";
import fireIcon from "../assets/types/fire.svg";
import flyingIcon from "../assets/types/flying.svg";
import ghostIcon from "../assets/types/ghost.svg";
import grassIcon from "../assets/types/grass.svg";
import groundIcon from "../assets/types/ground.svg";
import iceIcon from "../assets/types/ice.svg";
import normalIcon from "../assets/types/normal.svg";
import poisonIcon from "../assets/types/poison.svg";
import psychicIcon from "../assets/types/psychic.svg";
import rockIcon from "../assets/types/rock.svg";
import steelIcon from "../assets/types/steel.svg";
import waterIcon from "../assets/types/water.svg";


const StylePokemonService = {
  get() {
    const types = {
      bug: { icon: bugIcon, color: "#c4cf68" },
      dark: { icon: darkIcon, color: "#9e8e83" },
      dragon: { icon: dragonIcon, color: "#9e78fa" },
      electric: { icon: electricIcon, color: "#fadf73" },
      fairy: { icon: fairyIcon, color: "#f3bac7" },
      fighting: { icon:fightingIcon, color: "#d4736d" },
      fire: { icon: fireIcon, color: "#f5a973" },
      flying: { icon: flyingIcon, color: "#c4b4f5" },
      ghost: { icon: ghostIcon, color: "#9e8eb9" },
      grass: { icon: grassIcon, color: "#a3da88" },
      ground: { icon: groundIcon, color: "#ead499" },
      ice: { icon: iceIcon, color: "#b9e5e5" },
      normal: { icon: normalIcon, color: "#c4c4a3" },
      poison: { icon: poisonIcon, color: "#bf7dbf" },
      psychic: { icon: psychicIcon, color: "#fa8eae" },
      rock: { icon: rockIcon, color: "#cfbf78" },
      steel: { icon: steelIcon, color: "#cfcfdf" },
      water: { icon: waterIcon, color: "#99b4f5" },
    };

    return types;
  },
};
export default StylePokemonService;
