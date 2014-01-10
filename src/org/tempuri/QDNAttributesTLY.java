
package org.tempuri;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>QDNAttributesTLY complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="QDNAttributesTLY">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="MESLotNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MESLotQTY" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="MESPackageName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="txtMachineName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MESProductPartNum" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MESStepCodeName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MESProductTechnology" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MESProductCellBit" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MESProductCapacity" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="txtHoldDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="TableTestData" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BinDataTable" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="txtProgramID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MESProductDieQTY" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="txtHoldShift" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="txtHoldBy" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Attachment" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ProbeCard" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="HoldCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "QDNAttributesTLY", propOrder = {
    "mesLotNumber",
    "mesLotQTY",
    "mesPackageName",
    "txtMachineName",
    "mesProductPartNum",
    "mesStepCodeName",
    "mesProductTechnology",
    "mesProductCellBit",
    "mesProductCapacity",
    "txtHoldDate",
    "tableTestData",
    "binDataTable",
    "txtProgramID",
    "mesProductDieQTY",
    "txtHoldShift",
    "txtHoldBy",
    "attachment",
    "probeCard",
    "holdCode"
})
public class QDNAttributesTLY {

    @XmlElement(name = "MESLotNumber")
    protected String mesLotNumber;
    @XmlElement(name = "MESLotQTY")
    protected int mesLotQTY;
    @XmlElement(name = "MESPackageName")
    protected String mesPackageName;
    protected String txtMachineName;
    @XmlElement(name = "MESProductPartNum")
    protected String mesProductPartNum;
    @XmlElement(name = "MESStepCodeName")
    protected String mesStepCodeName;
    @XmlElement(name = "MESProductTechnology")
    protected String mesProductTechnology;
    @XmlElement(name = "MESProductCellBit")
    protected String mesProductCellBit;
    @XmlElement(name = "MESProductCapacity")
    protected String mesProductCapacity;
    protected String txtHoldDate;
    @XmlElement(name = "TableTestData")
    protected String tableTestData;
    @XmlElement(name = "BinDataTable")
    protected String binDataTable;
    protected String txtProgramID;
    @XmlElement(name = "MESProductDieQTY")
    protected int mesProductDieQTY;
    protected String txtHoldShift;
    protected String txtHoldBy;
    @XmlElement(name = "Attachment")
    protected String attachment;
    @XmlElement(name = "ProbeCard")
    protected String probeCard;
    @XmlElement(name = "HoldCode")
    protected String holdCode;

    /**
     * 获取mesLotNumber属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMESLotNumber() {
        return mesLotNumber;
    }

    /**
     * 设置mesLotNumber属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMESLotNumber(String value) {
        this.mesLotNumber = value;
    }

    /**
     * 获取mesLotQTY属性的值。
     * 
     */
    public int getMESLotQTY() {
        return mesLotQTY;
    }

    /**
     * 设置mesLotQTY属性的值。
     * 
     */
    public void setMESLotQTY(int value) {
        this.mesLotQTY = value;
    }

    /**
     * 获取mesPackageName属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMESPackageName() {
        return mesPackageName;
    }

    /**
     * 设置mesPackageName属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMESPackageName(String value) {
        this.mesPackageName = value;
    }

    /**
     * 获取txtMachineName属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTxtMachineName() {
        return txtMachineName;
    }

    /**
     * 设置txtMachineName属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTxtMachineName(String value) {
        this.txtMachineName = value;
    }

    /**
     * 获取mesProductPartNum属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMESProductPartNum() {
        return mesProductPartNum;
    }

    /**
     * 设置mesProductPartNum属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMESProductPartNum(String value) {
        this.mesProductPartNum = value;
    }

    /**
     * 获取mesStepCodeName属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMESStepCodeName() {
        return mesStepCodeName;
    }

    /**
     * 设置mesStepCodeName属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMESStepCodeName(String value) {
        this.mesStepCodeName = value;
    }

    /**
     * 获取mesProductTechnology属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMESProductTechnology() {
        return mesProductTechnology;
    }

    /**
     * 设置mesProductTechnology属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMESProductTechnology(String value) {
        this.mesProductTechnology = value;
    }

    /**
     * 获取mesProductCellBit属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMESProductCellBit() {
        return mesProductCellBit;
    }

    /**
     * 设置mesProductCellBit属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMESProductCellBit(String value) {
        this.mesProductCellBit = value;
    }

    /**
     * 获取mesProductCapacity属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMESProductCapacity() {
        return mesProductCapacity;
    }

    /**
     * 设置mesProductCapacity属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMESProductCapacity(String value) {
        this.mesProductCapacity = value;
    }

    /**
     * 获取txtHoldDate属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTxtHoldDate() {
        return txtHoldDate;
    }

    /**
     * 设置txtHoldDate属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTxtHoldDate(String value) {
        this.txtHoldDate = value;
    }

    /**
     * 获取tableTestData属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTableTestData() {
        return tableTestData;
    }

    /**
     * 设置tableTestData属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTableTestData(String value) {
        this.tableTestData = value;
    }

    /**
     * 获取binDataTable属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBinDataTable() {
        return binDataTable;
    }

    /**
     * 设置binDataTable属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBinDataTable(String value) {
        this.binDataTable = value;
    }

    /**
     * 获取txtProgramID属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTxtProgramID() {
        return txtProgramID;
    }

    /**
     * 设置txtProgramID属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTxtProgramID(String value) {
        this.txtProgramID = value;
    }

    /**
     * 获取mesProductDieQTY属性的值。
     * 
     */
    public int getMESProductDieQTY() {
        return mesProductDieQTY;
    }

    /**
     * 设置mesProductDieQTY属性的值。
     * 
     */
    public void setMESProductDieQTY(int value) {
        this.mesProductDieQTY = value;
    }

    /**
     * 获取txtHoldShift属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTxtHoldShift() {
        return txtHoldShift;
    }

    /**
     * 设置txtHoldShift属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTxtHoldShift(String value) {
        this.txtHoldShift = value;
    }

    /**
     * 获取txtHoldBy属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTxtHoldBy() {
        return txtHoldBy;
    }

    /**
     * 设置txtHoldBy属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTxtHoldBy(String value) {
        this.txtHoldBy = value;
    }

    /**
     * 获取attachment属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAttachment() {
        return attachment;
    }

    /**
     * 设置attachment属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAttachment(String value) {
        this.attachment = value;
    }

    /**
     * 获取probeCard属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getProbeCard() {
        return probeCard;
    }

    /**
     * 设置probeCard属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setProbeCard(String value) {
        this.probeCard = value;
    }

    /**
     * 获取holdCode属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHoldCode() {
        return holdCode;
    }

    /**
     * 设置holdCode属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHoldCode(String value) {
        this.holdCode = value;
    }

}
