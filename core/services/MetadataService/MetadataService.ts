import { http } from "@/services/http";
import { Metadata } from "@/models";
import { ValueTranslations } from "@/models/enum/MetadataValue";

const getAndParseMetadata = async (): Promise<Metadata[] | undefined> => {
  const url = `/Metadata/GetMetadataByPagination`;
  try {
    const res = await http().get(url);
    const rawMetadata: Metadata[] = res.data.result.data;
    const parsedMetadata: Metadata[] = rawMetadata.map((e) => {
      const parsedValue = JSON.parse(e.value); // Parse the JSON string
      const translatedValue =
        ValueTranslations[parsedValue.data] || parsedValue.data; // Get the translated value
      return {
        ...e,
        value: translatedValue,
        active: e.active !== undefined ? e.active : 0,
      };
    });
    return parsedMetadata;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const MetadataService = { getAndParseMetadata };
