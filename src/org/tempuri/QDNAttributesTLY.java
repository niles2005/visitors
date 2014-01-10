
package org.tempuri;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>QDNAttributesTLY complex type�� Java �ࡣ
 * 
 * <p>����ģʽƬ��ָ�������ڴ����е�Ԥ�����ݡ�
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
     * ��ȡmesLotNumber���Ե�ֵ��
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
     * ����mesLotNumber���Ե�ֵ��
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
     * ��ȡmesLotQTY���Ե�ֵ��
     * 
     */
    public int getMESLotQTY() {
        return mesLotQTY;
    }

    /**
     * ����mesLotQTY���Ե�ֵ��
     * 
     */
    public void setMESLotQTY(int value) {
        this.mesLotQTY = value;
    }

    /**
     * ��ȡmesPackageName���Ե�ֵ��
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
     * ����mesPackageName���Ե�ֵ��
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
     * ��ȡtxtMachineName���Ե�ֵ��
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
     * ����txtMachineName���Ե�ֵ��
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
     * ��ȡmesProductPartNum���Ե�ֵ��
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
     * ����mesProductPartNum���Ե�ֵ��
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
     * ��ȡmesStepCodeName���Ե�ֵ��
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
     * ����mesStepCodeName���Ե�ֵ��
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
     * ��ȡmesProductTechnology���Ե�ֵ��
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
     * ����mesProductTechnology���Ե�ֵ��
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
     * ��ȡmesProductCellBit���Ե�ֵ��
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
     * ����mesProductCellBit���Ե�ֵ��
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
     * ��ȡmesProductCapacity���Ե�ֵ��
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
     * ����mesProductCapacity���Ե�ֵ��
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
     * ��ȡtxtHoldDate���Ե�ֵ��
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
     * ����txtHoldDate���Ե�ֵ��
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
     * ��ȡtableTestData���Ե�ֵ��
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
     * ����tableTestData���Ե�ֵ��
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
     * ��ȡbinDataTable���Ե�ֵ��
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
     * ����binDataTable���Ե�ֵ��
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
     * ��ȡtxtProgramID���Ե�ֵ��
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
     * ����txtProgramID���Ե�ֵ��
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
     * ��ȡmesProductDieQTY���Ե�ֵ��
     * 
     */
    public int getMESProductDieQTY() {
        return mesProductDieQTY;
    }

    /**
     * ����mesProductDieQTY���Ե�ֵ��
     * 
     */
    public void setMESProductDieQTY(int value) {
        this.mesProductDieQTY = value;
    }

    /**
     * ��ȡtxtHoldShift���Ե�ֵ��
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
     * ����txtHoldShift���Ե�ֵ��
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
     * ��ȡtxtHoldBy���Ե�ֵ��
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
     * ����txtHoldBy���Ե�ֵ��
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
     * ��ȡattachment���Ե�ֵ��
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
     * ����attachment���Ե�ֵ��
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
     * ��ȡprobeCard���Ե�ֵ��
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
     * ����probeCard���Ե�ֵ��
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
     * ��ȡholdCode���Ե�ֵ��
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
     * ����holdCode���Ե�ֵ��
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
