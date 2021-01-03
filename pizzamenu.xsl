<?xml version="1.0" ?>
<!-- Referecing and based on Mikhail PaddyCaffe's https://github.com/mikhail-cct/xml-bootcamp -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
    <!-- Menu from Pizza Planet -->
        <table id="pizzamenu" border="1" class="menudesign">
            <thead>
                <tr>
                <!-- Creating table columns of 4 -->
                    <th colspan = "4"> Pizza Planet Menu </th>
                </tr>

                <!-- Creting columns name-->
                <tr>
                    <th> Add to cart </th>
                    <th> Item </th>
                    <th> Ingredients </th>
                    <th> Price </th>
                </tr>
            </thead>

            <tbody>
            <!-- For the types of pizza we create different tables -->
                <xsl:for-each select="/pizzaplanet/types">
                <!-- Creating the 4 columns -->
                <tr>
                    <td colspan="4"> <xsl:value-of select="@name"/> </td>
                </tr>
                    <xsl:for-each select="product">
                        <!-- Giving columns titles -->
                        <tr id="positionTables">
                            <td colspan="4">
                                <!-- Getting xml tags-->
                                <td> <input name="pizza" type = "checkbox"/> </td>
                                <td> <xsl:value-of select="pizza"/> </td>
                                <td> <xsl:value-of select="ingredients"/> </td>
                                <td> <xsl:value-of select="price"/> </td>
                            </td>
                        </tr>
                    </xsl:for-each>
                </xsl:for-each>
            </tbody>
        </table>

        <!-- Menu for create your own -->
        <table id="createpizza" class="menudesign">
        
        </table>
    </xsl:template>
</xsl:stylesheet>