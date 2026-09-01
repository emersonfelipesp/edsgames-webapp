/**
 * The EDSGAMES static PIX BR Code, copied verbatim from edsgames.com.br.
 *
 * ⚠️ DO NOT EDIT THIS STRING. It is an EMV static payload whose final four
 * characters (`3244`) are a CRC-16/CCITT-FALSE checksum over everything that
 * precedes them. Reformatting it, trimming the unusual spacing inside the
 * merchant-name field, or "tidying" it in any other way invalidates the
 * checksum, and every Brazilian bank app will reject the resulting code.
 *
 * The QR code image in `public/img/pix-qrcode.png` is the original PNG from the
 * current site, committed byte for byte. It is never regenerated, for the same
 * reason.
 */
export const PIX_PAYLOAD =
  "00020101021126580014br.gov.bcb.pix0136bc30ce17-a764-4832-8ec1-32bbb8ced2985204000053039865802BR592053 4 6 E C S PEREIRA6005COTIA62070503***63043244";

/** Recipient as encoded in field 59 of the payload above. */
export const PIX_RECEIVER = "53 4 6 E C S PEREIRA";

export const PIX_QR_IMAGE = "/img/pix-qrcode.png";
