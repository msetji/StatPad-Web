import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';
import AlarmClock from './AlarmClock';
import ArrowLeft from './ArrowLeft';
import Award from './Award';
import Bot from './Bot';
import BowArrow from './BowArrow';
import Briefcase from './Briefcase';
import Call from './Call';
import Camera from './Camera';
import ChartColumnIncreasing from './ChartColumnIncreasing';
import ChartLine from './ChartLine';
import ChartNoAxesCombined from './ChartNoAxesCombined';
import Check from './Check';
import ChefHat from './ChefHat';
import ChevronLeft from './ChevronLeft';
import ChevronRight from './ChevronRight';
import CircleQuestionMark from './CircleQuestionMark';
import CircleX from './CircleX';
import Clock from './Clock';
import Comment from './Comment';
import CookingPot from './CookingPot';
import Crown from './Crown';
import Delete from './Delete';
import Dumbbell from './Dumbbell';
import Edit from './Edit';
import Flame from './Flame';
import FlaskConical from './FlaskConical';
import Gauge from './Gauge';
import Google from './Google';
import HandCoins from './HandCoins';
import Heart from './Heart';
import Home from './Home';
import Image from './Image';
import Images from './Images';
import Info from './Info';
import Link from './Link';
import Location from './Location';
import Lock from './Lock';
import Logout from './Logout';
import Mail from './Mail';
import Medal from './Medal';
import Microwave from './Microwave';
import PartyPopper from './PartyPopper';
import Pause from './Pause';
import Play from './Play';
import Plus from './Plus';
import RefreshCcw from './RefreshCcw';
import Rocket from './Rocket';
import Scissors from './Scissors';
import Search from './Search';
import Send from './Send';
import Settings from './Settings';
import Share from './Share';
import Shield from './Shield';
import Star from './Star';
import ThreeDotsCircle from './ThreeDotsCircle';
import ThreeDotsHorizontal from './ThreeDotsHorizontal';
import Trash from './Trash';
import Trophy from './Trophy';
import User from './User';
import Video from './Video';
import Volleyball from './Volleyball';
import VolumeX from './VolumeX';
import X from './X';

const icons = {
  alarmClock: AlarmClock,
  home: Home,
  mail: Mail,
  lock: Lock,
  user: User,
  heart: Heart,
  plus: Plus,
  search: Search,
  location: Location,
  call: Call,
  camera: Camera,
  edit: Edit,
  arrowLeft: ArrowLeft,
  threeDotsCircle: ThreeDotsCircle,
  threeDotsHorizontal: ThreeDotsHorizontal,
  comment: Comment,
  share: Share,
  send: Send,
  star: Star,
  delete: Delete,
  logout: Logout,
  image: Image,
  images: Images,
  video: Video,
  trophy: Trophy,
  medal: Medal,
  award: Award,
  gauge: Gauge,
  google: Google,
  dumbbell: Dumbbell,
  link: Link,
  circleQuestionMark: CircleQuestionMark,
  circleX: CircleX,
  check: Check,
  x: X,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  clock: Clock,
  info: Info,
  pause: Pause,
  play: Play,
  scissors: Scissors,
  trash: Trash,

  chartColumnIncreasing: ChartColumnIncreasing,
  chartLine: ChartLine,
  chartNoAxesCombined: ChartNoAxesCombined,

  rocket: Rocket,
  partyPopper: PartyPopper,
  flame: Flame,
  flaskConical: FlaskConical,

  crown: Crown,
  bowArrow: BowArrow,
  briefcase: Briefcase,
  microwave: Microwave,
  chefHat: ChefHat,
  cookingPot: CookingPot,
  volumeX: VolumeX,
  bot: Bot,
  handCoins: HandCoins,
  shield: Shield,
  refreshCcw: RefreshCcw,
  settings: Settings,
  volleyball: Volleyball,
};

const Icon = ({ name, ...props }) => {
  const IconComponent = icons[name];
  if (!IconComponent) return null;

  return (
    <IconComponent
      height={props.size || 24}
      width={props.size || 24}
      strokeWidth={props.strokeWidth || 1.9}
      color={theme.colors.textLight}
      {...props}
    />
  );
};

export default Icon;

const styles = StyleSheet.create({});
