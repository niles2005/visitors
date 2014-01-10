
package org.tempuri;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>anonymous complex type�� Java �ࡣ
 * 
 * <p>����ģʽƬ��ָ�������ڴ����е�Ԥ�����ݡ�
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
     * ��ȡstartPos���Ե�ֵ��
     * 
     */
    public long getStartPos() {
        return startPos;
    }

    /**
     * ����startPos���Ե�ֵ��
     * 
     */
    public void setStartPos(long value) {
        this.startPos = value;
    }

    /**
     * ��ȡendPos���Ե�ֵ��
     * 
     */
    public long getEndPos() {
        return endPos;
    }

    /**
     * ����endPos���Ե�ֵ��
     * 
     */
    public void setEndPos(long value) {
        this.endPos = value;
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

}
