
package org.tempuri;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
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
 *         &lt;element name="getLotRejectQTYResult" type="{http://www.w3.org/2001/XMLSchema}long"/>
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
    "getLotRejectQTYResult"
})
@XmlRootElement(name = "getLotRejectQTYResponse")
public class GetLotRejectQTYResponse {

    protected long getLotRejectQTYResult;

    /**
     * ��ȡgetLotRejectQTYResult���Ե�ֵ��
     * 
     */
    public long getGetLotRejectQTYResult() {
        return getLotRejectQTYResult;
    }

    /**
     * ����getLotRejectQTYResult���Ե�ֵ��
     * 
     */
    public void setGetLotRejectQTYResult(long value) {
        this.getLotRejectQTYResult = value;
    }

}
