# Dicom data format

3 or 4 fields

Attribute Tag, (Value Representation), Value Length, Value Field

**/!\\**

Value Representation (VR) may or may not be present.
Depends on the type of "Value Representaton Encoding".

## Attribute tag

**Pair of 16-bit unsigned integers**

Consists of (group number, element number)

element number is unique for each group

**hexadecimal numbers!**

Look up this number "0010" (hex) -> 16 (decimal) -> Patient Name

<table>
  <thead>
      <td>Tag group</td>
      <td>Meaning</td>
  </thead>
  <tbody>
  <tr>
      <td>0000</td>
      <td>Command Elements</td>
  </tr>
  <tr>
      <td>0002</td>
      <td>File meta elements</td>
  </tr>
  <tr>
      <td>0004</td>
      <td>Directory structuring elements</td>
  </tr>
  <tr>
      <td>0006</td>
      <td>(not used)</td>
  </tr>
  <tr>
      <td>0008</td>
      <td>Data elements</td>
  </tr>
  </tbody>
</table>

## Standard attribute tags

**Even group numbers** are standard. Odd number groups are private and
I'm going to ignore them.

## Value Representation (VR)

**Two-byte character string**

Gives encoding type for data in the Value Field.

VR exists when there is "explicit value representation".

**Does not exist for implicit value represenation.**

Implicit value representation uses default value types for each field.

Possible value representations.

<table border="1" class="docutils">
<colgroup>
<col width="40%">
<col width="60%">
</colgroup>
<thead valign="bottom">
<tr class="row-odd"><th class="head">Value Representation</th>
<th class="head">Description</th>
</tr>
</thead>
<tbody valign="top">
<tr class="row-even"><td>AE</td>
<td>Application Entity</td>
</tr>
<tr class="row-odd"><td>AS</td>
<td>Age String</td>
</tr>
<tr class="row-even"><td>AT</td>
<td>Attribute Tag</td>
</tr>
<tr class="row-odd"><td>CS</td>
<td>Code String</td>
</tr>
<tr class="row-even"><td>DA</td>
<td>Date</td>
</tr>
<tr class="row-odd"><td>DS</td>
<td>Decimal String</td>
</tr>
<tr class="row-even"><td>DT</td>
<td>Date/Time</td>
</tr>
<tr class="row-odd"><td>FL</td>
<td>Floating Point Single (4 bytes)</td>
</tr>
<tr class="row-even"><td>FD</td>
<td>Floating Point Double (8 bytes)</td>
</tr>
<tr class="row-odd"><td>IS</td>
<td>Integer String</td>
</tr>
<tr class="row-even"><td>LO</td>
<td>Long String</td>
</tr>
<tr class="row-odd"><td>LT</td>
<td>Long Text</td>
</tr>
<tr class="row-even"><td>OB</td>
<td>Other Byte</td>
</tr>
<tr class="row-odd"><td>OF</td>
<td>Other Float</td>
</tr>
<tr class="row-even"><td>OW</td>
<td>Other Word</td>
</tr>
<tr class="row-odd"><td>PN</td>
<td>Person Name</td>
</tr>
<tr class="row-even"><td>SH</td>
<td>Short String</td>
</tr>
<tr class="row-odd"><td>SL</td>
<td>Signed Long</td>
</tr>
<tr class="row-even"><td>SQ</td>
<td>Sequence of Items</td>
</tr>
<tr class="row-odd"><td>SS</td>
<td>Signed Short</td>
</tr>
<tr class="row-even"><td>ST</td>
<td>Short Text</td>
</tr>
<tr class="row-odd"><td>TM</td>
<td>Time</td>
</tr>
<tr class="row-even">
  <td>UI</td>
  <td>Unique Identifier</td>
</tr>
<tr class="row-odd">
  <td>UL</td>
  <td>Unsigned Long</td>
</tr>
<tr class="row-even">
  <td>UN</td>
  <td>Unknown</td>
</tr>
<tr class="row-odd">
  <td>US</td>
  <td>Unsigned Short</td>
</tr>
<tr class="row-even">
  <td>UT</td>
  <td>Unlimited Text</td>
</tr>
</tbody>
</table>

## Value Length

**The length of the data** contained in the Value Field tag.

Can also be a flag that says it's undefined. In which case we look for
a special Item or a Sequence Delimitation tag.

**a 16 or 32-bit unsigned integer** (number of bytes)

or

**32-bit length Field set to undefined length** (FFFFFFFFH)

only if VR is "SQ or UN"

## Value field
**even number of bytes** storing the values of the data element.

## Putting it all together

<table>
  <colgroup>
  <col width="13%">
  <col width="42%">
  <col width="37%">
  <col width="4%">
  <col width="4%">
  </colgroup>
  <thead valign="bottom">
    <tr class="row-odd"><th class="head">Tag</th>
    <th class="head">Name</th>
    <th class="head">Keyword</th>
    <th class="head">VR</th>
    <th class="head">VM</th>
  </tr>
</thead>
<tbody valign="top">
  <tr class="row-even"><td>(0010,0010)</td>
  <td>Patient’s Name</td>
  <td>PatientName</td>
  <td>PN</td>
  <td>1</td>
</tr>
<tr class="row-odd"><td>(0010,0020)</td>
  <td>Patient ID</td>
  <td>PatientID</td>
  <td>LO</td>
  <td>1</td>
</tr>
<tr class="row-even"><td>(0010,0021)</td>
  <td>Issuer of Patient ID</td>
  <td>IssuerOfPatientID</td>
  <td>LO</td>
  <td>1</td>
</tr>
<tr class="row-odd"><td>(0010,0022)</td>
  <td>Type of Patient ID</td>
  <td>TypeOfPatientID</td>
  <td>CS</td>
  <td>1</td>
</tr>
<tr class="row-even"><td>(0010,0024)</td>
  <td>Issuer of Patient ID Qualifiers Sequence</td>
  <td>IssuerOfPatientIDQualifiersSequence</td>
  <td>SQ</td>
  <td>1</td>
</tr>
<tr class="row-odd"><td>(0010,0030)</td>
  <td>Patient’s Birth Date</td>
  <td>PatientBirthDate</td>
  <td>DA</td>
  <td>1</td>
</tr>
<tr class="row-even"><td>(0010,0032)</td>
  <td>Patient’s Birth Time</td>
  <td>PatientBirthTime</td>
  <td>TM</td>
  <td>1</td>
</tr>
</tbody>
</table>

## Value Multiplicity (VM)

Specifies the number of Values that can be encoded in the Value Field.

Explicitly specified in PS3.6 (Data Dictionary)

(see http://medical.nema.org/Dicom/2011/11_06pu.pdf)


## Approach

1. Read header information

1.1 Read tag
1.2 Read value representation
1.3 Read Value length
1.4 Read Value field