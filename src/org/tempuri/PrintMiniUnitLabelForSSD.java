
package org.tempuri;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>anonymous complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="WorkOrder" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="StartPos" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="EndPos" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="PrinterName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "workOrder",
    "startPos",
    "endPos",
    "printerName"
})
@XmlRootElement(name = "PrintMiniUnitLabelForSSD")
public class PrintMiniUnitLabelForSSD {

    @XmlElement(name = "WorkOrder")
    protected String workOrder;
    @XmlElement(name = "StartPos")
    protected long startPos;
    @XmlElement(name = "EndPos")
    protected long endPos;
    @XmlElement(name = "PrinterName")
    protected String printerName;

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
     * 获取startPos属性的值。
     * 
     */
    public long getStartPos() {
        return startPos;
    }

    /**
     * 设置startPos属性的值。
     * 
     */
    public void setStartPos(long value) {
        this.startPos = value;
    }

    /**
     * 获取endPos属性的值。
     * 
     */
    public long getEndPos() {
        return endPos;
    }

    /**
     * 设置endPos属性的值。
     * 
     */
    public void setEndPos(long value) {
        this.endPos = value;
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

}
