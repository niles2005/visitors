
package org.tempuri;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>QDNAttributesGeneric complex type�� Java �ࡣ
 * 
 * <p>����ģʽƬ��ָ�������ڴ����е�Ԥ�����ݡ�
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
     * ��ȡworkOrder���Ե�ֵ��
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
     * ����workOrder���Ե�ֵ��
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
     * ��ȡmesLotQTY���Ե�ֵ��
     * 
     */
    public long getMESLotQTY() {
        return mesLotQTY;
    }

    /**
     * ����mesLotQTY���Ե�ֵ��
     * 
     */
    public void setMESLotQTY(long value) {
        this.mesLotQTY = value;
    }

    /**
     * ��ȡlotYield���Ե�ֵ��
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
     * ����lotYield���Ե�ֵ��
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
     * ��ȡqdnHoldReason���Ե�ֵ��
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
     * ����qdnHoldReason���Ե�ֵ��
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
     * ��ȡdefectCode���Ե�ֵ��
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
     * ����defectCode���Ե�ֵ��
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
     * ��ȡdefectQTY���Ե�ֵ��
     * 
     */
    public long getDefectQTY() {
        return defectQTY;
    }

    /**
     * ����defectQTY���Ե�ֵ��
     * 
     */
    public void setDefectQTY(long value) {
        this.defectQTY = value;
    }

    /**
     * ��ȡqdnRemark���Ե�ֵ��
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
     * ����qdnRemark���Ե�ֵ��
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
     * ��ȡnextOwner���Ե�ֵ��
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
     * ����nextOwner���Ե�ֵ��
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
     * ��ȡdefectReportAttachment���Ե�ֵ��
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
     * ����defectReportAttachment���Ե�ֵ��
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
     * ��ȡdefectCodeTable���Ե�ֵ��
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
     * ����defectCodeTable���Ե�ֵ��
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

    /**
     * ��ȡholdBy���Ե�ֵ��
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
     * ����holdBy���Ե�ֵ��
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

}
