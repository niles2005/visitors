
package org.tempuri;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>QDNAttributesSPC complex type�� Java �ࡣ
 * 
 * <p>����ģʽƬ��ָ�������ڴ����е�Ԥ�����ݡ�
 * 
 * <pre>
 * &lt;complexType name="QDNAttributesSPC">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="LotNum" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LotQtyIn" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="LotQtyOut" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="PackageType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MachineName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ProdPartNum" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ProcessStep" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Technology" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CellBit" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DieQty" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="Capacity" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="HoldDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Shift" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="HoldBy" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Characteristic" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="OperatorName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="AlarmRule" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="IXLimitUCL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="IXLimitCL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="IXLimitLCL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="SLimitUCL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="SLimitLCL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="SpecLimitUSL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="SpecLimitTarget" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="SpecLimitLSL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="SPCPart" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MeasuredValueMean" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MeasuredValueSTD" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MeasuredValueRawData" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="HoldCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CreatedBy" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CreateTime" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "QDNAttributesSPC", propOrder = {
    "lotNum",
    "lotQtyIn",
    "lotQtyOut",
    "packageType",
    "machineName",
    "prodPartNum",
    "processStep",
    "technology",
    "cellBit",
    "dieQty",
    "capacity",
    "holdDate",
    "shift",
    "holdBy",
    "characteristic",
    "operatorName",
    "alarmRule",
    "ixLimitUCL",
    "ixLimitCL",
    "ixLimitLCL",
    "sLimitUCL",
    "sLimitLCL",
    "specLimitUSL",
    "specLimitTarget",
    "specLimitLSL",
    "spcPart",
    "measuredValueMean",
    "measuredValueSTD",
    "measuredValueRawData",
    "holdCode",
    "createdBy",
    "createTime"
})
public class QDNAttributesSPC {

    @XmlElement(name = "LotNum")
    protected String lotNum;
    @XmlElement(name = "LotQtyIn")
    protected long lotQtyIn;
    @XmlElement(name = "LotQtyOut")
    protected long lotQtyOut;
    @XmlElement(name = "PackageType")
    protected String packageType;
    @XmlElement(name = "MachineName")
    protected String machineName;
    @XmlElement(name = "ProdPartNum")
    protected String prodPartNum;
    @XmlElement(name = "ProcessStep")
    protected String processStep;
    @XmlElement(name = "Technology")
    protected String technology;
    @XmlElement(name = "CellBit")
    protected String cellBit;
    @XmlElement(name = "DieQty")
    protected int dieQty;
    @XmlElement(name = "Capacity")
    protected String capacity;
    @XmlElement(name = "HoldDate")
    protected String holdDate;
    @XmlElement(name = "Shift")
    protected String shift;
    @XmlElement(name = "HoldBy")
    protected String holdBy;
    @XmlElement(name = "Characteristic")
    protected String characteristic;
    @XmlElement(name = "OperatorName")
    protected String operatorName;
    @XmlElement(name = "AlarmRule")
    protected String alarmRule;
    @XmlElement(name = "IXLimitUCL")
    protected String ixLimitUCL;
    @XmlElement(name = "IXLimitCL")
    protected String ixLimitCL;
    @XmlElement(name = "IXLimitLCL")
    protected String ixLimitLCL;
    @XmlElement(name = "SLimitUCL")
    protected String sLimitUCL;
    @XmlElement(name = "SLimitLCL")
    protected String sLimitLCL;
    @XmlElement(name = "SpecLimitUSL")
    protected String specLimitUSL;
    @XmlElement(name = "SpecLimitTarget")
    protected String specLimitTarget;
    @XmlElement(name = "SpecLimitLSL")
    protected String specLimitLSL;
    @XmlElement(name = "SPCPart")
    protected String spcPart;
    @XmlElement(name = "MeasuredValueMean")
    protected String measuredValueMean;
    @XmlElement(name = "MeasuredValueSTD")
    protected String measuredValueSTD;
    @XmlElement(name = "MeasuredValueRawData")
    protected String measuredValueRawData;
    @XmlElement(name = "HoldCode")
    protected String holdCode;
    @XmlElement(name = "CreatedBy")
    protected String createdBy;
    @XmlElement(name = "CreateTime")
    protected String createTime;

    /**
     * ��ȡlotNum���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLotNum() {
        return lotNum;
    }

    /**
     * ����lotNum���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLotNum(String value) {
        this.lotNum = value;
    }

    /**
     * ��ȡlotQtyIn���Ե�ֵ��
     * 
     */
    public long getLotQtyIn() {
        return lotQtyIn;
    }

    /**
     * ����lotQtyIn���Ե�ֵ��
     * 
     */
    public void setLotQtyIn(long value) {
        this.lotQtyIn = value;
    }

    /**
     * ��ȡlotQtyOut���Ե�ֵ��
     * 
     */
    public long getLotQtyOut() {
        return lotQtyOut;
    }

    /**
     * ����lotQtyOut���Ե�ֵ��
     * 
     */
    public void setLotQtyOut(long value) {
        this.lotQtyOut = value;
    }

    /**
     * ��ȡpackageType���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPackageType() {
        return packageType;
    }

    /**
     * ����packageType���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPackageType(String value) {
        this.packageType = value;
    }

    /**
     * ��ȡmachineName���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMachineName() {
        return machineName;
    }

    /**
     * ����machineName���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMachineName(String value) {
        this.machineName = value;
    }

    /**
     * ��ȡprodPartNum���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getProdPartNum() {
        return prodPartNum;
    }

    /**
     * ����prodPartNum���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setProdPartNum(String value) {
        this.prodPartNum = value;
    }

    /**
     * ��ȡprocessStep���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getProcessStep() {
        return processStep;
    }

    /**
     * ����processStep���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setProcessStep(String value) {
        this.processStep = value;
    }

    /**
     * ��ȡtechnology���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTechnology() {
        return technology;
    }

    /**
     * ����technology���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTechnology(String value) {
        this.technology = value;
    }

    /**
     * ��ȡcellBit���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCellBit() {
        return cellBit;
    }

    /**
     * ����cellBit���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCellBit(String value) {
        this.cellBit = value;
    }

    /**
     * ��ȡdieQty���Ե�ֵ��
     * 
     */
    public int getDieQty() {
        return dieQty;
    }

    /**
     * ����dieQty���Ե�ֵ��
     * 
     */
    public void setDieQty(int value) {
        this.dieQty = value;
    }

    /**
     * ��ȡcapacity���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCapacity() {
        return capacity;
    }

    /**
     * ����capacity���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCapacity(String value) {
        this.capacity = value;
    }

    /**
     * ��ȡholdDate���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHoldDate() {
        return holdDate;
    }

    /**
     * ����holdDate���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHoldDate(String value) {
        this.holdDate = value;
    }

    /**
     * ��ȡshift���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getShift() {
        return shift;
    }

    /**
     * ����shift���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setShift(String value) {
        this.shift = value;
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
     * ��ȡcharacteristic���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCharacteristic() {
        return characteristic;
    }

    /**
     * ����characteristic���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCharacteristic(String value) {
        this.characteristic = value;
    }

    /**
     * ��ȡoperatorName���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOperatorName() {
        return operatorName;
    }

    /**
     * ����operatorName���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOperatorName(String value) {
        this.operatorName = value;
    }

    /**
     * ��ȡalarmRule���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAlarmRule() {
        return alarmRule;
    }

    /**
     * ����alarmRule���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAlarmRule(String value) {
        this.alarmRule = value;
    }

    /**
     * ��ȡixLimitUCL���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIXLimitUCL() {
        return ixLimitUCL;
    }

    /**
     * ����ixLimitUCL���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIXLimitUCL(String value) {
        this.ixLimitUCL = value;
    }

    /**
     * ��ȡixLimitCL���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIXLimitCL() {
        return ixLimitCL;
    }

    /**
     * ����ixLimitCL���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIXLimitCL(String value) {
        this.ixLimitCL = value;
    }

    /**
     * ��ȡixLimitLCL���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIXLimitLCL() {
        return ixLimitLCL;
    }

    /**
     * ����ixLimitLCL���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIXLimitLCL(String value) {
        this.ixLimitLCL = value;
    }

    /**
     * ��ȡsLimitUCL���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSLimitUCL() {
        return sLimitUCL;
    }

    /**
     * ����sLimitUCL���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSLimitUCL(String value) {
        this.sLimitUCL = value;
    }

    /**
     * ��ȡsLimitLCL���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSLimitLCL() {
        return sLimitLCL;
    }

    /**
     * ����sLimitLCL���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSLimitLCL(String value) {
        this.sLimitLCL = value;
    }

    /**
     * ��ȡspecLimitUSL���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSpecLimitUSL() {
        return specLimitUSL;
    }

    /**
     * ����specLimitUSL���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSpecLimitUSL(String value) {
        this.specLimitUSL = value;
    }

    /**
     * ��ȡspecLimitTarget���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSpecLimitTarget() {
        return specLimitTarget;
    }

    /**
     * ����specLimitTarget���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSpecLimitTarget(String value) {
        this.specLimitTarget = value;
    }

    /**
     * ��ȡspecLimitLSL���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSpecLimitLSL() {
        return specLimitLSL;
    }

    /**
     * ����specLimitLSL���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSpecLimitLSL(String value) {
        this.specLimitLSL = value;
    }

    /**
     * ��ȡspcPart���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSPCPart() {
        return spcPart;
    }

    /**
     * ����spcPart���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSPCPart(String value) {
        this.spcPart = value;
    }

    /**
     * ��ȡmeasuredValueMean���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMeasuredValueMean() {
        return measuredValueMean;
    }

    /**
     * ����measuredValueMean���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMeasuredValueMean(String value) {
        this.measuredValueMean = value;
    }

    /**
     * ��ȡmeasuredValueSTD���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMeasuredValueSTD() {
        return measuredValueSTD;
    }

    /**
     * ����measuredValueSTD���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMeasuredValueSTD(String value) {
        this.measuredValueSTD = value;
    }

    /**
     * ��ȡmeasuredValueRawData���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMeasuredValueRawData() {
        return measuredValueRawData;
    }

    /**
     * ����measuredValueRawData���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMeasuredValueRawData(String value) {
        this.measuredValueRawData = value;
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
     * ��ȡcreatedBy���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * ����createdBy���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCreatedBy(String value) {
        this.createdBy = value;
    }

    /**
     * ��ȡcreateTime���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCreateTime() {
        return createTime;
    }

    /**
     * ����createTime���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCreateTime(String value) {
        this.createTime = value;
    }

}
