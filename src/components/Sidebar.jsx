import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Checkmark } from "../assets/Misc/checkmark.svg";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: fit-content;
  padding: 30px;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
  color: #473f3f;
  font-family: 'Inconsolata', monospace, sans-serif;
`;

const Filter = styled.div`
  margin-bottom: 30px;
`;

const FilterTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 20px;
  color: #473f3f;
  font-weight: 700;
  font-family: 'Inconsolata', monospace, sans-serif;
`;

const Input = styled.input`
  border-radius: 10px; 
  border: none;

  &:focus {
    border: none;
    outline: none;
  }
`;

const Checkbox = styled.input`
  appearance: none;
  display: inline-block;
  position: relative;
  background-color: white;
  border: 1px solid gray;
  border-radius: 4px;
  height: 16px;
  width: 16px;
  margin-right: 10px;
  
  &:before {
    content: "";
    position: absolute;
    left: 3px;
    top: 3px;
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 4px;
  }
  &:checked:before {
    content: "";
    position: absolute;
    left: 2px;
    top: 2px;
    width: 10px;
    height: 10px;
    background-color: gray;
    border-radius: 4px;
  }
  &:focus {
    outline: none;
    border-color: blue;
  }
`; 



const Label = styled.label`
  font-family: 'Inconsolata', monospace, sans-serif;
  font-size: 18px;
  color: #473f3f;
  font-weight: 700;
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const FilterContainer = styled.div`
  padding: 20px 20px 20px 5px;
`;


const ApplyButton = styled.button`
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: darkgreen;
  }
`;

const Sidebar = () => {
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000,
  });

  const handlePriceRangeChange = (event) => {
    setPriceRange({
      ...priceRange,
      [event.target.name]: event.target.value,
    });
  };

  const [brand, setBrand] = useState([]);

  const handleBrandChange = (event) => {
    if (event.target.checked) {
      setBrand([...brand, event.target.value]);
    } else {
      setBrand(brand.filter((b) => b !== event.target.value));
    }
  };

  const [color, setColor] = useState([]);

  const handleColorChange = (event) => {
    if (event.target.checked) {
      setColor([...color, event.target.value]);
    } else {
      setColor(color.filter((c) => c !== event.target.value));
    }
  };

  return (
    <Container>
      <Title>Filter</Title>
      <Filter>
        <FilterTitle>Price Range</FilterTitle>
        <div>
          <Input
            type="number"
            name="min"
            value={priceRange.min}
            className="mb-3"
            onChange={handlePriceRangeChange}
          />
          
          <Input
            type="number"
            name="max"
            value={priceRange.max}
            onChange={handlePriceRangeChange}
          />
        </div>
      </Filter>
      <FilterTitle>Brand</FilterTitle>
      <FilterContainer>
        <FilterOption>
          <Checkbox id="brand-apple" type="checkbox" />
          <Label htmlFor="brand-apple">Apple</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="brand-samsung" type="checkbox" />
          <Label htmlFor="brand-samsung">Samsung</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="brand-google" type="checkbox" />
          <Label htmlFor="brand-google">Google</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="brand-huawei" type="checkbox" />
          <Label htmlFor="brand-huawei">Huawei</Label>
        </FilterOption>
      </FilterContainer>

      <FilterTitle>Price</FilterTitle>
      <FilterContainer>
        <FilterOption>
          <Checkbox id="price-0-500" type="checkbox" />
          <Label htmlFor="price-0-500">$0 - $500</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="price-500-1000" type="checkbox" />
          <Label htmlFor="price-500-1000">$500 - $1000</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="price-1000-1500" type="checkbox" />
          <Label htmlFor="price-1000-1500">$1000 - $1500</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="price-1500-above" type="checkbox" />
          <Label htmlFor="price-1500-above">$1500 and above</Label>
        </FilterOption>
      </FilterContainer>

      <FilterTitle>Color</FilterTitle>
      <FilterContainer>
        <FilterOption>
          <Checkbox id="color-black" type="checkbox" />
          <Label htmlFor="color-black">Black</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="color-white" type="checkbox" />
          <Label htmlFor="color-white">White</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="color-gray" type="checkbox" />
          <Label htmlFor="color-gray">Gray</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="color-red" type="checkbox" />
          <Label htmlFor="color-red">Red</Label>
        </FilterOption>
      </FilterContainer>

      <FilterTitle>Size</FilterTitle>
      <FilterContainer>
        <FilterOption>
          <Checkbox id="size-xs" type="checkbox" />
          <Label htmlFor="size-xs">XS</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="size-s" type="checkbox" />
          <Label htmlFor="size-s">S</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="size-m" type="checkbox" />
          <Label htmlFor="size-m">M</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="size-l" type="checkbox" />
          <Label htmlFor="size-l">L</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="size-xl" type="checkbox" />
          <Label htmlFor="size-xl">XL</Label>
        </FilterOption>
      </FilterContainer>

      <FilterTitle>Gender</FilterTitle>
      <FilterContainer>
        <FilterOption>
          <Checkbox id="gender-male" type="checkbox" />
          <Label htmlFor="gender-male">Male</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="gender-female" type="checkbox" />
          <Label htmlFor="gender-female">Female</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="gender-unisex" type="checkbox" />
          <Label htmlFor="gender-unisex">Unisex</Label>
        </FilterOption>
      </FilterContainer>

      <FilterTitle>Material</FilterTitle>
      <FilterContainer>
        <FilterOption>
          <Checkbox id="material-cotton" type="checkbox" />
          <Label htmlFor="material-cotton">Cotton</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="material-polyester" type="checkbox" />
          <Label htmlFor="material-polyester">Polyester</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="material-linen" type="checkbox" />
          <Label htmlFor="material-linen">Linen</Label>
        </FilterOption>
        <FilterOption>
          <Checkbox id="material-wool" type="checkbox" />
          <Label htmlFor="material-wool">Wool</Label>
        </FilterOption>
      </FilterContainer>

      <ApplyButton>Apply</ApplyButton>
      
    </Container>
  );
};

export default Sidebar;
