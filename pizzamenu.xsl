<?xml version="1.0" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
    <!-- Menu from Pizza Planet -->
        <table id="menupizza" class = "menudesign">
            <thead>
                <tr>
                <!-- Creating table columns of 4 -->
                    <th colspan = "4"> Pizza Planet Menu </th>
                </tr>
                <!-- Creting columns name-->
                    <th> Add to cart </th>
                    <th> Item </th>
                    <th> Ingredients </th>
                    <th> Price </th>
            </thead>
            <tbody>
            <!-- For the types of pizza we create different tables -->
                <xsl:for-each select='/pizzaplanet/types'>
                <tr id="positionTables">
                <!-- Creating the 4 columns again -->
                    <td colspan="4">
                        <!-- Getting xml tags-->
                        <td> <input name="pizza0" type = "checkbox"/> </td>
                        <td> <xsl:value-of select="pizza"/> </td>
                        <td> <xsl:value-of select="ingredients"/> </td>
                        <td> <xsl:value-of select="price"/> </td>
                    </td>
                </tr>
                </xsl:for-each>
            </tbody>
        </table>

        <!-- Menu for create your own -->
        <table id="createpizza" class = "menudesign">
        
        </table>
    </xsl:template>
</xsl:stylesheet>