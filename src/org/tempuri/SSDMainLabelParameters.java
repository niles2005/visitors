
package org.tempuri;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>SSDMainLabelParameters complex type�� Java �ࡣ
 * 
 * <p>����ģʽƬ��ָ�������ڴ����е�Ԥ�����ݡ�
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
     * ��ȡserialNumber���Ե�ֵ��
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
     * ����serialNumber���Ե�ֵ��
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
     * ��ȡprinterName���Ե�ֵ��
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
     * ����printerName���Ե�ֵ��
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
     * ��ȡprintCount���Ե�ֵ��
     * 
     */
    public int getPrintCount() {
        return printCount;
    }

    /**
     * ����printCount���Ե�ֵ��
     * 
     */
    public void setPrintCount(int value) {
        this.printCount = value;
    }

    /**
     * ��ȡprintStart���Ե�ֵ��
     * 
     */
    public int getPrintStart() {
        return printStart;
    }

    /**
     * ����printStart���Ե�ֵ��
     * 
     */
    public void setPrintStart(int value) {
        this.printStart = value;
    }

    /**
     * ��ȡcurY���Ե�ֵ��
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
     * ����curY���Ե�ֵ��
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
     * ��ȡcurW���Ե�ֵ��
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
     * ����curW���Ե�ֵ��
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
     * ��ȡllCode���Ե�ֵ��
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
     * ����llCode���Ե�ֵ��
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
     * ��ȡuserID���Ե�ֵ��
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
     * ����userID���Ե�ֵ��
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
     * ��ȡwo���Ե�ֵ��
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
     * ����wo���Ե�ֵ��
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
