
package org.tempuri;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>QDNAttributesTEP complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="QDNAttributesTEP">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="LotNum" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LotQty" type="{http://www.w3.org/2001/XMLSchema}long"/>
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
 *         &lt;element name="ProgramID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="EPResultTable" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
@XmlType(name = "QDNAttributesTEP", propOrder = {
    "lotNum",
    "lotQty",
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
    "programID",
    "epResultTable",
    "holdCode"
})
public class QDNAttributesTEP {

    @XmlElement(name = "LotNum")
    protected String lotNum;
    @XmlElement(name = "LotQty")
    protected long lotQty;
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
    @XmlElement(name = "ProgramID")
    protected String programID;
    @XmlElement(name = "EPResultTable")
    protected String epResultTable;
    @XmlElement(name = "HoldCode")
    protected String holdCode;

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
     * 获取lotQty属性的值。
     * 
     */
    public long getLotQty() {
        return lotQty;
    }

    /**
     * 设置lotQty属性的值。
     * 
     */
    public void setLotQty(long value) {
        this.lotQty = value;
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
     * 获取programID属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getProgramID() {
        return programID;
    }

    /**
     * 设置programID属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setProgramID(String value) {
        this.programID = value;
    }

    /**
     * 获取epResultTable属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEPResultTable() {
        return epResultTable;
    }

    /**
     * 设置epResultTable属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEPResultTable(String value) {
        this.epResultTable = value;
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
