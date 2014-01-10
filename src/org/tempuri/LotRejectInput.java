
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
 *         &lt;element name="LotNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="EquipmentID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="RejectCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="RejectQTY" type="{http://www.w3.org/2001/XMLSchema}long"/>
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
    "lotNumber",
    "equipmentID",
    "rejectCode",
    "rejectQTY"
})
@XmlRootElement(name = "LotRejectInput")
public class LotRejectInput {

    @XmlElement(name = "LotNumber")
    protected String lotNumber;
    @XmlElement(name = "EquipmentID")
    protected String equipmentID;
    @XmlElement(name = "RejectCode")
    protected String rejectCode;
    @XmlElement(name = "RejectQTY")
    protected long rejectQTY;

    /**
     * ��ȡlotNumber���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLotNumber() {
        return lotNumber;
    }

    /**
     * ����lotNumber���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLotNumber(String value) {
        this.lotNumber = value;
    }

    /**
     * ��ȡequipmentID���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEquipmentID() {
        return equipmentID;
    }

    /**
     * ����equipmentID���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEquipmentID(String value) {
        this.equipmentID = value;
    }

    /**
     * ��ȡrejectCode���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRejectCode() {
        return rejectCode;
    }

    /**
     * ����rejectCode���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRejectCode(String value) {
        this.rejectCode = value;
    }

    /**
     * ��ȡrejectQTY���Ե�ֵ��
     * 
     */
    public long getRejectQTY() {
        return rejectQTY;
    }

    /**
     * ����rejectQTY���Ե�ֵ��
     * 
     */
    public void setRejectQTY(long value) {
        this.rejectQTY = value;
    }

}
