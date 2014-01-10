
package org.tempuri;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>SSDMainLabelParameters complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="SSDMainLabelParameters">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="SerialNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PrinterName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PrintCount" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="PrintStart" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="CurY" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CurW" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LLCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="UserID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="WO" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "SSDMainLabelParameters", propOrder = {
    "serialNumber",
    "printerName",
    "printCount",
    "printStart",
    "curY",
    "curW",
    "llCode",
    "userID",
    "wo"
})
public class SSDMainLabelParameters {

    @XmlElement(name = "SerialNumber")
    protected String serialNumber;
    @XmlElement(name = "PrinterName")
    protected String printerName;
    @XmlElement(name = "PrintCount")
    protected int printCount;
    @XmlElement(name = "PrintStart")
    protected int printStart;
    @XmlElement(name = "CurY")
    protected String curY;
    @XmlElement(name = "CurW")
    protected String curW;
    @XmlElement(name = "LLCode")
    protected String llCode;
    @XmlElement(name = "UserID")
    protected String userID;
    @XmlElement(name = "WO")
    protected String wo;

    /**
     * 获取serialNumber属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSerialNumber() {
        return serialNumber;
    }

    /**
     * 设置serialNumber属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSerialNumber(String value) {
        this.serialNumber = value;
    }

    /**
     * 获取printerName属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPrinterName() {
        return printerName;
    }

    /**
     * 设置printerName属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPrinterName(String value) {
        this.printerName = value;
    }

    /**
     * 获取printCount属性的值。
     * 
     */
    public int getPrintCount() {
        return printCount;
    }

    /**
     * 设置printCount属性的值。
     * 
     */
    public void setPrintCount(int value) {
        this.printCount = value;
    }

    /**
     * 获取printStart属性的值。
     * 
     */
    public int getPrintStart() {
        return printStart;
    }

    /**
     * 设置printStart属性的值。
     * 
     */
    public void setPrintStart(int value) {
        this.printStart = value;
    }

    /**
     * 获取curY属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCurY() {
        return curY;
    }

    /**
     * 设置curY属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCurY(String value) {
        this.curY = value;
    }

    /**
     * 获取curW属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCurW() {
        return curW;
    }

    /**
     * 设置curW属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCurW(String value) {
        this.curW = value;
    }

    /**
     * 获取llCode属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLLCode() {
        return llCode;
    }

    /**
     * 设置llCode属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLLCode(String value) {
        this.llCode = value;
    }

    /**
     * 获取userID属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUserID() {
        return userID;
    }

    /**
     * 设置userID属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUserID(String value) {
        this.userID = value;
    }

    /**
     * 获取wo属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWO() {
        return wo;
    }

    /**
     * 设置wo属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWO(String value) {
        this.wo = value;
    }

}
