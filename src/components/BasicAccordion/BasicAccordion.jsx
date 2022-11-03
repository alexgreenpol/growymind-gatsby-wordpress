import React from "react"
import parse from "html-react-parser"

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"

import "./BasicAccordion.scss"

const BasicAccordion = ({ items }) => {
  return (
    <Accordion itemScope="itemscope" itemType="https://schema.org/FAQPage">
      {items.map(item => {
        return (
          <AccordionItem key={item.question}>
            <AccordionItemHeading
              key={item.question}
              itemScope="itemscope"
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <AccordionItemButton>{item.question}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel
              itemScope="itemscope"
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              {parse(item.answer)}
            </AccordionItemPanel>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default BasicAccordion
