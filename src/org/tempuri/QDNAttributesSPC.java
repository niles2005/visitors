
package org.tempuri;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>QDNAttributesSPC complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
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
     * 获取lotNum属性的值。
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
     * 设置lotNum属性的值。
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
     * 获取lotQtyIn属性的值。
     * 
     */
    public long getLotQtyIn() {
        return lotQtyIn;
    }

    /**
     * 设置lotQtyIn属性的值。
     * 
     */
    public void setLotQtyIn(long value) {
        this.lotQtyIn = value;
    }

    /**
     * 获取lotQtyOut属性的值。
     * 
     */
    public long getLotQtyOut() {
        return lotQtyOut;
    }

    /**
     * 设置lotQtyOut属性的值。
     * 
     */
    public void setLotQtyOut(long value) {
        this.lotQtyOut = value;
    }

    /**
     * 获取packageType属性的值。
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
     * 设置packageType属性的值。
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
     * 获取machineName属性的值。
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
     * 设置machineName属性的值。
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
     * 获取prodPartNum属性的值。
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
     * 设置prodPartNum属性的值。
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
     * 获取processStep属性的值。
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
     * 设置processStep属性的值。
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
     * 获取technology属性的值。
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
     * 设置technology属性的值。
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
     * 获取cellBit属性的值。
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
     * 设置cellBit属性的值。
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
     * 获取dieQty属性的值。
     * 
     */
    public int getDieQty() {
        return dieQty;
    }

    /**
     * 设置dieQty属性的值。
     * 
     */
    public void setDieQty(int value) {
        this.dieQty = value;
    }

    /**
     * 获取capacity属性的值。
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
     * 设置capacity属性的值。
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
     * 获取holdDate属性的值。
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
     * 设置holdDate属性的值。
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
     * 获取shift属性的值。
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
     * 设置shift属性的值。
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
     * 获取characteristic属性的值。
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
     * 设置characteristic属性的值。
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
     * 获取operatorName属性的值。
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
     * 设置operatorName属性的值。
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
     * 获取alarmRule属性的值。
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
     * 设置alarmRule属性的值。
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
     * 获取ixLimitUCL属性的值。
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
     * 设置ixLimitUCL属性的值。
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
     * 获取ixLimitCL属性的值。
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
     * 设置ixLimitCL属性的值。
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
     * 获取ixLimitLCL属性的值。
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
     * 设置ixLimitLCL属性的值。
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
     * 获取sLimitUCL属性的值。
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
     * 设置sLimitUCL属性的值。
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
     * 获取sLimitLCL属性的值。
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
     * 设置sLimitLCL属性的值。
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
     * 获取specLimitUSL属性的值。
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
     * 设置specLimitUSL属性的值。
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
     * 获取specLimitTarget属性的值。
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
     * 设置specLimitTarget属性的值。
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
     * 获取specLimitLSL属性的值。
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
     * 设置specLimitLSL属性的值。
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
     * 获取spcPart属性的值。
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
     * 设置spcPart属性的值。
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
     * 获取measuredValueMean属性的值。
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
     * 设置measuredValueMean属性的值。
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
     * 获取measuredValueSTD属性的值。
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
     * 设置measuredValueSTD属性的值。
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
     * 获取measuredValueRawData属性的值。
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
     * 设置measuredValueRawData属性的值。
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
     * 获取createdBy属性的值。
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
     * 设置createdBy属性的值。
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
     * 获取createTime属性的值。
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
     * 设置createTime属性的值。
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
