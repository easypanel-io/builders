import {
  Alert,
  Box,
  Button,
  Flex,
  Select,
  Stack,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import Form from "@rjsf/chakra-ui";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Output } from "~builders-utils";
import * as builders from "../builders/_list";

const Home: NextPage = () => {
  const [selected, setSelected] = useState<keyof typeof builders | "">("");
  const [formData, setFormData] = useState<any>();
  const [error, setError] = useState<string>("");
  const [output, setOutput] = useState<Output | null>(null);

  const builder = selected ? builders[selected] : null;

  useEffect(() => {
    setFormData(null);
    setOutput(null);
  }, [selected]);

  return (
    <Box
      display={{ lg: "grid" }}
      gridTemplateRows="auto 1fr"
      gridTemplateColumns="400px 1fr"
      height={{ lg: "100vh" }}
      bg="gray.800"
    >
      <Box
        shadow="md"
        zIndex="100"
        gridRow="1 / 2"
        gridColumn="1 / 3"
        px="4"
        py="2"
        bg="white"
      >
        <Flex direction="row" alignItems="center">
          <Text fontWeight="bold" fontSize="lg" mr="6">
            Builders
          </Text>
          <Select
            width="64"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value as any);
            }}
          >
            <option value="">Select Builder</option>
            {Object.entries(builders).map(([key, value]) => (
              <option key={key} value={key}>
                {value.name}
              </option>
            ))}
          </Select>
        </Flex>
      </Box>
      {builder && (
        <Box
          gridRow="2 / 3"
          gridColumn="1 / 2"
          overflow="auto"
          p="4"
          bg="white"
        >
          <Form
            schema={builder.schema as any}
            formData={formData}
            onChange={(event) => setFormData(event.formData)}
            onSubmit={({ formData }) => {
              try {
                const output = builder.generate(formData);
                setError("");
                setOutput(output);
              } catch (error) {
                setError(`Error: ${(error as Error).message}`);
              }
            }}
            noHtml5Validate
            showErrorList={false}
            validate={builder.validate}
            transformErrors={builder.transformErrors}
          >
            <Button type="submit" colorScheme="brand">
              Generate
            </Button>
          </Form>
        </Box>
      )}
      <Box gridRow="2 / 3" gridColumn="2 / 3" overflow="auto" p="4">
        {error && <Alert>{error}</Alert>}
        {output && (
          <Stack alignItems="start">
            {output.map((file, index) => (
              <File key={index} {...file} />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

function File({ name, content }: { name: string; content: string }) {
  const { hasCopied, onCopy } = useClipboard(content);
  return (
    <Stack w="100%">
      <Flex
        bg="white"
        p="1"
        pl="4"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>{name}</Box>
        <Button onClick={onCopy}>{hasCopied ? "Copied" : "Copy"}</Button>
      </Flex>
      <Box as="pre" overflow="auto" w="100%" color="white">
        {content}
      </Box>
    </Stack>
  );
}

export default Home;
