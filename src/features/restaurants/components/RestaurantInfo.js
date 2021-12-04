import React from "react";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import isOpen from "../../../../assets/isOpen";
import { Spacer } from "../../../components/spacer/Spacer";
import {Text} from '../../../components/typography/TextTypography'
import {Icon, RestaurantCard, RestaurantCardCover, Rating, SectionEnd, Info, Address} from './RestaurantInfoStyles'
import { Favourite } from "../../../components/favourite/Favourite";

export default function RestaurantInfo({ restaurant = {} }) {
  const {
    name = "Some Restaurant",
    icon = "https://static.vecteezy.com/system/resources/previews/002/227/941/original/healthy-breakfast-rgb-color-icon-vector.jpg",
    photos = [
      "https://media.istockphoto.com/photos/juicy-hamburger-on-white-background-picture-id1206323282?b=1&k=20&m=1206323282&s=170667a&w=0&h=HuuZHlI67OCWiCH5jP94PbrJpj4_26CMJ2NlugqiNIk=",
    ],
    address = "100 some random address",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));
  return (
    <RestaurantCard elevation={5}>
      <Favourite restaurant={restaurant}/>
      <RestaurantCardCover source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Rating>
          {ratingArray.map((_,index) => (
            <SvgXml key={index} xml={star} width={20} height={20} />
          ))}

          <SectionEnd>
            {isClosedTemporarily ? (
              <Text variant="caption" style={{color : 'red'}}>CLOSED TEMPORARILY</Text>
            ) : null}
            <Spacer position="left" size="large">
              {isOpenNow ? (
                <SvgXml xml={isOpen} width={20} height={20} />
              ) : null}
            </Spacer>
            <Spacer position="left" size="large">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </SectionEnd>
        </Rating>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
}
