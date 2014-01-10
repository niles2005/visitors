
package org.tempuri;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>QDNAttributesGeneric complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="QDNAttributesGeneric">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="MESLotNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="WorkOrder" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="txtMachineName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MESPackageName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MESProductPartNum" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MESStepCodeName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MESLotQTY" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="LotYield" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="QDN_HoldReason" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DefectCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DefectQTY" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="QDN_Remark" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="NextOwner" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DefectReportAttachment" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DefectCodeTable" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="HoldCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="HoldBy" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="txtHoldDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="txtHoldShift" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "QDNAttributesGeneric", propOrder = {
    "mesLotNumber",
    "workOrder",
    "txtMachineName",
    "mesPackageName",
    "mesProductPartNum",
    "mesStepCodeName",
    "mesLotQTY",
    "lotYield",
    "qdnHoldReason",
    "defectCode",
    "defectQTY",
    "qdnRemark",
    "nextOwner",
    "defectReportAttachment",
    "defectCodeTable",
    "holdCode",
    "holdBy",
    "txtHoldDate",
    "txtHoldShift"
})
public class QDNAttributesGeneric {

    @XmlElement(name = "MESLotNumber")
    protected String mesLotNumber;
    @XmlElement(name = "WorkOrder")
    protected String workOrder;
    protected String txtMachineName;
    @XmlElement(name = "MESPackageName")
    protected String mesPackageName;
    @XmlElement(name = "MESProductPartNum")
    protected String mesProductPartNum;
    @XmlElement(name = "MESStepCodeName")
    protected String mesStepCodeName;
    @XmlElement(name = "MESLotQTY")
    protected long mesLotQTY;
    @XmlElement(name = "LotYield")
    protected String lotYield;
    @XmlElement(name = "QDN_HoldReason")
    protected String qdnHoldReason;
    @XmlElement(name = "DefectCode")
    protected String defectCode;
    @XmlElement(name = "DefectQTY")
    protected long defectQTY;
    @XmlElement(name = "QDN_Remark")
    protected String qdnRemark;
    @XmlElement(name = "NextOwner")
    protected String nextOwner;
    @XmlElement(name = "DefectReportAttachment")
    protected String defectReportAttachment;
    @XmlElement(name = "DefectCodeTable")
    protected String defectCodeTable;
    @XmlElement(name = "HoldCode")
    protected String holdCode;
    @XmlElement(name = "HoldBy")
    protected String holdBy;
    protected String txtHoldDate;
    protected String txtHoldShift;

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
     * 获取workOrder属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWorkOrder() {
        return workOrder;
    }

    /**
     * 设置workOrder属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWorkOrder(String value) {
        this.workOrder = value;
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
     * 获取mesLotQTY属性的值。
     * 
     */
    public long getMESLotQTY() {
        return mesLotQTY;
    }

    /**
     * 设置mesLotQTY属性的值。
     * 
     */
    public void setMESLotQTY(long value) {
        this.mesLotQTY = value;
    }

    /**
     * 获取lotYield属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLotYield() {
        return lotYield;
    }

    /**
     * 设置lotYield属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLotYield(String value) {
        this.lotYield = value;
    }

    /**
     * 获取qdnHoldReason属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getQDNHoldReason() {
        return qdnHoldReason;
    }

    /**
     * 设置qdnHoldReason属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setQDNHoldReason(String value) {
        this.qdnHoldReason = value;
    }

    /**
     * 获取defectCode属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDefectCode() {
        return defectCode;
    }

    /**
     * 设置defectCode属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDefectCode(String value) {
        this.defectCode = value;
    }

    /**
     * 获取defectQTY属性的值。
     * 
     */
    public long getDefectQTY() {
        return defectQTY;
    }

    /**
     * 设置defectQTY属性的值。
     * 
     */
    public void setDefectQTY(long value) {
        this.defectQTY = value;
    }

    /**
     * 获取qdnRemark属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getQDNRemark() {
        return qdnRemark;
    }

    /**
     * 设置qdnRemark属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setQDNRemark(String value) {
        this.qdnRemark = value;
    }

    /**
     * 获取nextOwner属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNextOwner() {
        return nextOwner;
    }

    /**
     * 设置nextOwner属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNextOwner(String value) {
        this.nextOwner = value;
    }

    /**
     * 获取defectReportAttachment属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDefectReportAttachment() {
        return defectReportAttachment;
    }

    /**
     * 设置defectReportAttachment属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDefectReportAttachment(String value) {
        this.defectReportAttachment = value;
    }

    /**
     * 获取defectCodeTable属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDefectCodeTable() {
        return defectCodeTable;
    }

    /**
     * 设置defectCodeTable属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDefectCodeTable(String value) {
        this.defectCodeTable = value;
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

    /**
     * 获取holdBy属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHoldBy() {
        return holdBy;
    }

    /**
     * 设置holdBy属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHoldBy(String value) {
        this.holdBy = value;
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

}
