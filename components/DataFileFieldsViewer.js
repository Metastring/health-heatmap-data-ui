import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Box
} from "@chakra-ui/core";

export default function DataFileFieldsViewer({ fields }) {
  return (
    <Accordion>
      {fields.map((field) => (
        <AccordionItem>
          <AccordionHeader>
            <Box flex="1" textAlign="left">
              {field.name}
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel pb={4}>
            <ol>
              {field.values.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ol>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
